-- AlterTable: add owner_id to servers
-- Step 1: Add column as nullable to handle existing rows
ALTER TABLE "servers" ADD COLUMN "owner_id" UUID;

-- Step 2: Add NOT NULL constraint (safe because schema requires it;
-- any pre-existing rows must be backfilled before running this migration)
ALTER TABLE "servers" ALTER COLUMN "owner_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
