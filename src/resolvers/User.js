/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * Get Workouts for a User
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function workouts(parent, args, context) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).workouts()
}

module.exports = {
  workouts,
}