-- Migration: add_auth_fields
-- Adds email + password_hash to users table and creates refresh_tokens table.

-- Ensure pgcrypto is available for gen_random_uuid() on Postgres < 13
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Add columns as nullable first so existing rows don't violate NOT NULL
ALTER TABLE "users"
  ADD COLUMN "email" VARCHAR(254),
  ADD COLUMN "password_hash" VARCHAR(72) NOT NULL DEFAULT '';

-- Backfill unique placeholder emails for any pre-existing rows
UPDATE "users" SET "email" = 'placeholder-' || id || '@invalid.local' WHERE "email" IS NULL;

-- Now enforce NOT NULL and drop the password_hash default
ALTER TABLE "users"
  ALTER COLUMN "email" SET NOT NULL,
  ALTER COLUMN "password_hash" DROP DEFAULT;

-- Unique index on email
CREATE UNIQUE INDEX "idx_users_email" ON "users"("email");

-- Refresh tokens table
CREATE TABLE "refresh_tokens" (
  "id"          UUID         NOT NULL DEFAULT gen_random_uuid(),
  "token_hash"  VARCHAR(64)  NOT NULL,
  "user_id"     UUID         NOT NULL,
  "expires_at"  TIMESTAMPTZ  NOT NULL,
  "revoked_at"  TIMESTAMPTZ,
  "created_at"  TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- Unique index on token_hash (used for lookup + revocation)
CREATE UNIQUE INDEX "idx_refresh_tokens_hash" ON "refresh_tokens"("token_hash");

-- Index on user_id for efficient "revoke all tokens for user" queries
CREATE INDEX "idx_refresh_tokens_user" ON "refresh_tokens"("user_id");

-- Foreign key to users
ALTER TABLE "refresh_tokens"
  ADD CONSTRAINT "refresh_tokens_user_id_fkey"
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
