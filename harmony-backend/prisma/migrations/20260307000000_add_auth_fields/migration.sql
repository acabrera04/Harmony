-- Migration: add_auth_fields
-- Adds email + password_hash to users table and creates refresh_tokens table.

-- Add email column (unique, not null) with a temporary default so existing rows are valid
ALTER TABLE "users"
  ADD COLUMN "email" VARCHAR(254) NOT NULL DEFAULT '',
  ADD COLUMN "password_hash" VARCHAR(72) NOT NULL DEFAULT '';

-- Remove the temporary defaults (new rows must supply values)
ALTER TABLE "users"
  ALTER COLUMN "email" DROP DEFAULT,
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
