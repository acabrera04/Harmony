-- DropForeignKey
ALTER TABLE "server_invites" DROP CONSTRAINT "server_invites_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "server_invites" DROP CONSTRAINT "server_invites_server_id_fkey";

-- DropIndex
DROP INDEX "idx_meta_tags_generated";

-- DropIndex
DROP INDEX "idx_messages_channel_time";

-- DropIndex
DROP INDEX "idx_audit_actor";

-- DropIndex
DROP INDEX "idx_audit_channel_time";

-- AlterTable
ALTER TABLE "server_invites" ALTER COLUMN "id" DROP DEFAULT;

-- CreateTable
CREATE TABLE "message_mentions" (
    "id" UUID NOT NULL,
    "message_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_mentions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "message_id" UUID NOT NULL,
    "channel_id" UUID NOT NULL,
    "server_id" UUID NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_message_mentions_user" ON "message_mentions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "idx_message_mentions_unique" ON "message_mentions"("message_id", "user_id");

-- CreateIndex
CREATE INDEX "idx_notifications_user_read" ON "notifications"("user_id", "read");

-- CreateIndex
CREATE INDEX "idx_notifications_user_created" ON "notifications"("user_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "server_invites" ADD CONSTRAINT "server_invites_server_id_fkey" FOREIGN KEY ("server_id") REFERENCES "servers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "server_invites" ADD CONSTRAINT "server_invites_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_mentions" ADD CONSTRAINT "message_mentions_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_mentions" ADD CONSTRAINT "message_mentions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
