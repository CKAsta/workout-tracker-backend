/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

/**
 * Get Workout
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
async function workout(parent, args, context) {
  return context.prisma.log.findUnique({ where: { id: parent.id } }).workout()
}

/**
 * Get LogEntries
 * @param {*} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @returns 
 */
 async function logEntries(parent, args, context) {
  return context.prisma.log.findUnique({ where: { id: parent.id } }).logEntries()
}

module.exports = {
  workout,
  logEntries
}