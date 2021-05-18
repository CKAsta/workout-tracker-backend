/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * Get exercisesOnWorkouts
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma}} context 
 * @returns 
 */
async function exercisesOnWorkouts(parent, args, context) {
  return context.prisma.workout.findUnique({ where: { id: parent.id } }).exercisesOnWorkouts()
}

/**
 * Get User
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma}} context 
 * @returns 
 */
async function user(parent, args, context) {
  return context.prisma.workout.findUnique({ where: { id: parent.id } }).user()
}

module.exports = {
  exercisesOnWorkouts,
  user,
}