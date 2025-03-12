/*
  Warnings:

  - Added the required column `user_id` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movie` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
