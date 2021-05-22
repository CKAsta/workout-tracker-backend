/*
  Warnings:

  - You are about to drop the column `sets` on the `ExercisesOnWorkouts` table. All the data in the column will be lost.
  - You are about to drop the column `reps` on the `ExercisesOnWorkouts` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SetTarget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exercisesOnWorkoutsId" INTEGER NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL DEFAULT 3,
    "weight" INTEGER NOT NULL DEFAULT 10,
    FOREIGN KEY ("exercisesOnWorkoutsId") REFERENCES "ExercisesOnWorkouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExercisesOnWorkouts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exerciseId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExercisesOnWorkouts" ("id", "exerciseId", "workoutId") SELECT "id", "exerciseId", "workoutId" FROM "ExercisesOnWorkouts";
DROP TABLE "ExercisesOnWorkouts";
ALTER TABLE "new_ExercisesOnWorkouts" RENAME TO "ExercisesOnWorkouts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
