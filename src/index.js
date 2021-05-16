const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

let exercises = [
  {
    id: 'exercise-0',
    name: 'Benchpress',
    muscleGroup: 'Chest'
  },
  {
    id: 'exercise-1',
    name: 'Squat',
    muscleGroup: 'Legs'
  }
]

let idCount = exercises.length
const resolvers = {
  Query: {
    info: () => `Test`,
    allExercises: () => exercises,
    exercise: (_, { id }) => exercises.find(e => e.id === id)
  },
  Mutation: {
    post: (parent, args) => {
      const exercise = {
        id: `exercise-${idCount}`,
        name: args.name,
        muscleGroup: args.muscleGroup,
      }
      exercises.push(exercise)

      return exercise
    },
    updateExercise: (parent, args) => {
      const exercise = exercises.find(e => e.id === args.id)

      exercise.name = args.name
      exercise.muscleGroup = args.muscleGroup

      return exercise
    },
    deleteExercise: (parent, args) => {
      const exercise = exercises.find(e => e.id === args.id)

      let removeIndex = exercises.map(exercise => exercise.id).indexOf(exercise.id)
      ~removeIndex && exercises.splice(removeIndex, 1)
      
      return exercise
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf-8'
  ),
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
}) 
