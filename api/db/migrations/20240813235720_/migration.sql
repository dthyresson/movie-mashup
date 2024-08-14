/*
  Warnings:

  - Made the column `movieMashupId` on table `Photo` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "falModel" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "movieMashupId" TEXT NOT NULL,
    CONSTRAINT "Photo_movieMashupId_fkey" FOREIGN KEY ("movieMashupId") REFERENCES "MovieMashup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("createdAt", "falModel", "id", "imageUrl", "movieMashupId", "updatedAt") SELECT "createdAt", "falModel", "id", "imageUrl", "movieMashupId", "updatedAt" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
