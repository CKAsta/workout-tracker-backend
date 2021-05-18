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
  return context.prisma.exercise.findUnique({ where: { id: parent.id } }).exercisesOnWorkouts()
}

module.exports = {
  exercisesOnWorkouts
}