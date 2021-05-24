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

/**
 * Get Logs
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function logs(parent, args, context) {
  return context.prisma.workout.findUnique({ where: { id: parent.id } }).logs()
}

module.exports = {
  exercisesOnWorkouts,
  user,
  logs
}