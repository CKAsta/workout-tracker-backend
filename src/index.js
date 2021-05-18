const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Exercise = require('./resolvers/Exercise')
const Workout = require('./resolvers/Workout')
const ExercisesOnWorkouts = require('./resolvers/ExercisesOnWorkouts')
const User = require('./resolvers/User')
const { getUserId } = require('./utils')

const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation,
  Exercise,
  Workout,
  ExercisesOnWorkouts,
  User,
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf-8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
}) 
