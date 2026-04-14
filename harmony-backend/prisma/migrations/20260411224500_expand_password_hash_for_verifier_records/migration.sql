-- Issue #313
-- Expand password_hash so it can store the verifier scheme prefix + salt + bcrypt hash.
-- This migration preserves verifier-based credentials for fresh deployments.
-- Legacy bcrypt-only credentials cannot be auto-migrated from this schema change
-- alone; those accounts require a password reset or an out-of-band upgrade flow.
ALTER TABLE "users"
ALTER COLUMN "password_hash" TYPE VARCHAR(255);
