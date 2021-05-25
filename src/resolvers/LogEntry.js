/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * Get Log
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function log(parent, args, context) {
  return context.prisma.logEntry.findUnique({ where: { id: parent.id } }).log()
}

/**
 * Get ExercisesOnWorkout
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function exercisesOnWorkouts(parent, args, context) {
  return context.prisma.logEntry.findUnique({ where: { id: parent.id } }).exercisesOnWorkouts()
}

module.exports = {
  log,
  exercisesOnWorkouts
}