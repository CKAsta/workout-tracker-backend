/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * Get workouts
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function workout(parent, args, context) {
  return context.prisma.exercisesOnWorkouts.findUnique({ where: { id: parent.id } }).workout()
}

async function exercise(parent, args, context) {
  return context.prisma.exercisesOnWorkouts.findUnique({ where: { id: parent.id } }).exercise()
}

module.exports = {
  workout,
  exercise,
}