/*
  Warnings:

  - You are about to drop the column `parentId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `parentType` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "parentId",
DROP COLUMN "parentType";

-- DropEnum
DROP TYPE "CommentType";
