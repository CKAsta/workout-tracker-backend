const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const newExercise = await prisma.exercise.create({
    data: {
      name: 'Benchpress',
      muscleGroup: 'Chest'
    }
  })
  const allExercises = await prisma.exercise.findMany()
  console.log(allExercises)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })