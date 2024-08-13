-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT,
    "releaseDate" DATETIME,
    "photo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieMashup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "firstMovieId" TEXT NOT NULL,
    "secondMovieId" TEXT NOT NULL,
    CONSTRAINT "MovieMashup_firstMovieId_fkey" FOREIGN KEY ("firstMovieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovieMashup_secondMovieId_fkey" FOREIGN KEY ("secondMovieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "falModel" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "movieMashupId" TEXT,
    CONSTRAINT "Photo_movieMashupId_fkey" FOREIGN KEY ("movieMashupId") REFERENCES "MovieMashup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_title_key" ON "Movie"("title");
