const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Exercise = require('./resolvers/Exercise')
const Workout = require('./resolvers/Workout')

const prisma = new PrismaClient()

const resolvers = {
  Query,
  Mutation,
  Exercise,
  Workout,
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
