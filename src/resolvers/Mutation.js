/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * Add a new Exercise
 * @param {any} parent 
 * @param { name: String, muscleGroup: String} args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 * @returns 
 */
 async function addExercise(parent, args, context, info) {
  return await context.prisma.exercise.create({
    data: {
      name: args.name,
      muscleGroup: args.muscleGroup
    }
  })
}

/**
 * Update a existing Exercise by ID
 * @param {any} parent 
 * @param { id: Int, name: String, muscleGroup: String} args
 * @param {{ prisma: Prisma }} context
 * @param {any} info
 */
async function updateExercise(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.exercise.update({
    where: {
      id: id,
    },
    data: {
      name: args.name,
      muscleGroup: args.muscleGroup,
    },
  })
}

/**
 * Delete a existing Exercise by ID
 * @param {any} parent 
 * @param { id: Int } args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 */
async function deleteExercise(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.exercise.delete({
    where: {
      id: id,
    },
  })
}

/**
 * Add a new Workout
 * @param {any} parent 
 * @param { name: String} args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 * @returns 
 */
 async function addWorkout(parent, args, context, info) {
  return await context.prisma.workout.create({
    data: {
      name: args.name,
    }
  })
}

/**
 * Update a existing Workout by ID
 * @param {any} parent 
 * @param { id: Int, name: String, muscleGroup: String} args
 * @param {{ prisma: Prisma }} context
 * @param {any} info
 */
async function updateWorkout(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.workout.update({
    where: {
      id: id,
    },
    data: {
      name: args.name,
    },
  })
}

/**
 * Delete a existing Workout by ID
 * @param {any} parent 
 * @param { id: Int } args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 */
async function deleteWorkout(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.workout.delete({
    where: {
      id: id,
    },
  })
}

/**
 * 
 * @param {any} parent 
 * @param { exerciseId: Int, workoutId: Int, sets: Int, repetitions: Int} args 
 * @param {{ prisma: Prisma}} context 
 * @param {any} info 
 */
 async function addExercisesOnWorkouts(parent, args, context, info) {
  return await context.prisma.exercisesOnWorkouts.create({
    data: {
      exercise: { connect: {id: parseInt(args.exerciseId) } },
      workout: { connect: {id: parseInt(args.workoutId) } },
      sets: args.sets,
      repetitions: args.repetitions,
    },
  })
}

module.exports = {
  addExercise,
  updateExercise,
  deleteExercise,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  addExercisesOnWorkouts,
}

