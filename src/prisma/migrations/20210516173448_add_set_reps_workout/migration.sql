/*
  Warnings:

  - Added the required column `sets` to the `ExercisesOnWorkouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repetitions` to the `ExercisesOnWorkouts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExercisesOnWorkouts" (
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,

    PRIMARY KEY ("exerciseId", "workoutId"),
    FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExercisesOnWorkouts" ("exerciseId", "workoutId") SELECT "exerciseId", "workoutId" FROM "ExercisesOnWorkouts";
DROP TABLE "ExercisesOnWorkouts";
ALTER TABLE "new_ExercisesOnWorkouts" RENAME TO "ExercisesOnWorkouts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
