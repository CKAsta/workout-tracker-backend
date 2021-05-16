/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    info: () => `This is a Workout API`,

    /**
     * Get all Exercises
     * @param {any} parent 
     * @param {any} args 
     * @param {{ prisma: Prisma }} context 
     * @returns 
     */
    getAllExercises: async(parent, args, context) => {
      return context.prisma.exercise.findMany()
    },

    /**
     * Get Exercise by ID
     * @param {any} parent 
     * @param {{ id: Int }} args 
     * @param {{ prisma: Prisma }} context 
     * @returns 
     */
    getExerciseById: async(parent, args, context) => {
      const id = +args.id
      return context.prisma.exercise.findUnique({
        where: {
          id: id
        }
      })
    }
  },
  Mutation: {
    /**
     * Add a new Exercise
     * @param {any} parent 
     * @param { name: String, muscleGroup: String} args 
     * @param {{ prisma: Prisma }} context 
     * @param {any} info 
     * @returns 
     */
    addExercise: (parent, args, context, info) => {
      const newExercise = context.prisma.exercise.create({
        data: {
          name: args.name,
          muscleGroup: args.muscleGroup
        }
      })
      return newExercise
    },

    /**
     * Update a existing Exercise by ID
     * @param {any} parent 
     * @param { id: Int, name: String, muscleGroup: String} args
     * @param {{ prisma: Prisma }} context
     * @param {any} info
     */
    updateExercise: (parent, args, context, info) => {
      const id = +args.id
      const updatedExercise = context.prisma.exercise.update({
        where: {
          id: id,
        },
        data: {
          name: args.name,
          muscleGroup: args.muscleGroup,
        },
      })
      return updatedExercise
    },
    
    /**
     * Delete a existing Exercise by ID
     * @param {any} parent 
     * @param { id: Int } args 
     * @param {{ prisma: Prisma }} context 
     * @param {any} info 
     */
    deleteExercise: (parent, args, context, info) => {
      const id = +args.id
      const deletedUser = context.prisma.exercise.delete({
        where: {
          id: id,
        },
      })
      return deletedUser
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf-8'
  ),
  resolvers,
  context: {
    prisma
  }
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
}) 
