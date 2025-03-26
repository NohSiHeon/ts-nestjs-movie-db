-- CreateIndex
CREATE FULLTEXT INDEX `Movie_title_idx` ON `Movie`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `Movie_actors_idx` ON `Movie`(`actors`);

-- CreateIndex
CREATE FULLTEXT INDEX `Movie_rating_idx` ON `Movie`(`rating`);
