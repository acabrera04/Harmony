-- AlterTable: add owner_id to servers
-- Step 1: Add column as nullable to handle existing rows
ALTER TABLE "servers" ADD COLUMN "owner_id" UUID;

-- Step 2: Fail fast if any existing rows would be orphaned by the NOT NULL constraint.
-- If your database has pre-existing server rows you must backfill owner_id before running
-- this migration: UPDATE "servers" SET "owner_id" = '<valid-user-uuid>' WHERE "owner_id" IS NULL;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "servers" WHERE "owner_id" IS NULL) THEN
    RAISE EXCEPTION
      'Migration aborted: servers table has rows with NULL owner_id. '
      'Backfill owner_id before applying this migration.';
  END IF;
END $$;

-- Step 3: Apply NOT NULL constraint now that we have confirmed no NULL rows exist
ALTER TABLE "servers" ALTER COLUMN "owner_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
