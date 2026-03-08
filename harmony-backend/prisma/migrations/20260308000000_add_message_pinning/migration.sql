-- Migration: add_message_pinning
-- Adds pinned boolean and pinned_at timestamp to messages table (Issue #101).

ALTER TABLE "messages"
  ADD COLUMN "pinned"    BOOLEAN      NOT NULL DEFAULT FALSE,
  ADD COLUMN "pinned_at" TIMESTAMPTZ;

-- Partial index for fast pinned-message lookups per channel
CREATE INDEX "idx_messages_channel_pinned"
  ON "messages" ("channel_id")
  WHERE pinned = TRUE;
