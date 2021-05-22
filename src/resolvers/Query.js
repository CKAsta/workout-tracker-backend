/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * Get all Exercises
 * @param {any} parent 
 * @param {any} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function getAllExercises(parent, args, context) {
  return context.prisma.exercise.findMany()
}

/**
 * Get Exercise by ID
 * @param {any} parent 
 * @param {{ id: Int }} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function getExerciseById(parent, args, context) {
  const id = +args.id
  return context.prisma.exercise.findUnique({
    where: {
      id: id
    }
  })
}

/**
 * Get all Exercises
 * @param {any} parent 
 * @param {any} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function getAllWorkouts(parent, args, context) {
  return context.prisma.workout.findMany()
}

/**
 * Get Workout by ID
 * @param {any} parent 
 * @param {{ id: Int }} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function getWorkoutById(parent, args, context) {
  const id = +args.id
  return context.prisma.workout.findUnique({
    where: {
      id: id
    }
  })
}

/**
 * Add a new Workout
 * @param {any} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 * @returns 
 */
async function me(parent, args, context) {
  const { userId } = context
  return context.prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}

module.exports = {
  getAllExercises,
  getExerciseById,
  getAllWorkouts,
  getWorkoutById,
  me
}