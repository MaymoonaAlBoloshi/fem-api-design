/*
  Warnings:

  - You are about to drop the column `updates` on the `Update` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Update" DROP COLUMN "updates",
ADD COLUMN     "status" "UPDATE_STATUSES" NOT NULL DEFAULT 'IN_PROGRESS';
