-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_fkey";

-- DropIndex
DROP INDEX IF EXISTS "idx_messages_channel_time";

-- DropIndex
DROP INDEX IF EXISTS "idx_audit_actor";

-- DropIndex
DROP INDEX IF EXISTS "idx_audit_channel_time";

-- AlterTable
ALTER TABLE "refresh_tokens" ALTER COLUMN "id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_refresh_tokens_hash" RENAME TO "refresh_tokens_token_hash_key";

-- RenameIndex
ALTER INDEX "idx_users_email" RENAME TO "users_email_key";

-- Restore canonical DESC indexes dropped above (Prisma does not track raw-SQL
-- indexes in the schema DSL and will re-drop them on every generated migration).
CREATE INDEX IF NOT EXISTS "idx_messages_channel_time"
  ON "messages"("channel_id", "created_at" DESC);

CREATE INDEX IF NOT EXISTS "idx_audit_channel_time"
  ON "visibility_audit_log"("channel_id", "timestamp" DESC);

CREATE INDEX IF NOT EXISTS "idx_audit_actor"
  ON "visibility_audit_log"("actor_id", "timestamp" DESC);
