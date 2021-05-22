/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

/**
 * Add a new Exercise
 * @param {any} parent 
 * @param { name: String, muscleGroup: String} args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 * @returns 
 */
 async function addExercise(parent, args, context, info) {
  return await context.prisma.exercise.create({
    data: {
      name: args.name,
      muscleGroup: args.muscleGroup
    }
  })
}

/**
 * Update a existing Exercise by ID
 * @param {any} parent 
 * @param { id: Int, name: String, muscleGroup: String} args
 * @param {{ prisma: Prisma }} context
 * @param {any} info
 */
async function updateExercise(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.exercise.update({
    where: {
      id: id,
    },
    data: {
      name: args.name,
      muscleGroup: args.muscleGroup,
    },
  })
}

/**
 * Delete a existing Exercise by ID
 * @param {any} parent 
 * @param { id: Int } args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 */
async function deleteExercise(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.exercise.delete({
    where: {
      id: id,
    },
  })
}

/**
 * Add a new Workout
 * @param {any} parent 
 * @param { name: String} args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 * @returns 
 */
 async function addWorkout(parent, args, context, info) {
  const { userId } = context
  return await context.prisma.workout.create({
    data: {
      name: args.name,
      user: { connect: { id: userId } },
    }
  })
}

/**
 * Update a existing Workout by ID
 * @param {any} parent 
 * @param { id: Int, name: String, muscleGroup: String} args
 * @param {{ prisma: Prisma }} context
 * @param {any} info
 */
async function updateWorkout(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.workout.update({
    where: {
      id: id,
    },
    data: {
      name: args.name,
    },
  })
}

/**
 * Delete a existing Workout by ID
 * @param {any} parent 
 * @param { id: Int } args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 */
async function deleteWorkout(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.workout.delete({
    where: {
      id: id,
    },
  })
}

/**
 * Add a new ExerciseOnWorkout
 * @param {any} parent 
 * @param { exerciseId: Int, workoutId: Int, sets: Int, repetitions: Int} args 
 * @param {{ prisma: Prisma}} context 
 * @param {any} info 
 */
async function addExercisesOnWorkouts(parent, args, context, info) {
  return await context.prisma.exercisesOnWorkouts.create({
    data: {
      exercise: { connect: {id: parseInt(args.exerciseId) } },
      workout: { connect: {id: parseInt(args.workoutId) } },
    },
  })
}

/**
 * Update a existing ExerciseOnWorkout by ID
 * @param {any} parent 
 * @param { id: Int, exerciseId: Int, workoutId: Int, sets: Int, repetitions: Int} args
 * @param {{ prisma: Prisma }} context
 * @param {any} info
 */
async function updateExercisesOnWorkouts(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.exercisesOnWorkouts.update({
    where: {
      id: id,
    },
    data: {
      exercise: { connect: {id: parseInt(args.exerciseId) } },
      workout: { connect: {id: parseInt(args.workoutId) } },
    },
  })
}

/**
 * Delete a existing Workout by ID
 * @param {any} parent 
 * @param { id: Int } args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 */
 async function deleteExercisesOnWorkouts(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.exercisesOnWorkouts.delete({
    where: {
      id: parseInt(args.id),
    },
  })
}

/**
 * Add a new ExerciseOnWorkout
 * @param {any} parent 
 * @param { exerciseId: Int, workoutId: Int, sets: Int, repetitions: Int} args 
 * @param {{ prisma: Prisma}} context 
 * @param {any} info 
 */
 async function addSetTarget(parent, args, context, info) {
  return await context.prisma.setTarget.create({
    data: {
      exercisesOnWorkouts: { connect: {id: parseInt(args.exercisesOnWorkoutsId) } },
      setNumber: args.setNumber,
      reps: args.reps,
      weight: args.weight,
    },
  })
}

/**
 * Update a existing ExerciseOnWorkout by ID
 * @param {any} parent 
 * @param { id: Int, exerciseId: Int, workoutId: Int, sets: Int, repetitions: Int} args
 * @param {{ prisma: Prisma }} context
 * @param {any} info
 */
async function updateSetTarget(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.setTarget.update({
    where: {
      id: id,
    },
    data: {
      exercisesOnWorkouts: { connect: {id: parseInt(args.exercisesOnWorkoutsId) } },
      setNumber: args.setNumber,
      reps: args.reps,
      weight: args.weight,
    },
  })
}

/**
 * Delete a existing Workout by ID
 * @param {any} parent 
 * @param { id: Int } args 
 * @param {{ prisma: Prisma }} context 
 * @param {any} info 
 */
 async function deleteSetTarget(parent, args, context, info) {
  const id = +args.id
  return await context.prisma.setTarget.delete({
    where: {
      id: parseInt(args.id),
    },
  })
}

/**
 * Sign Up
 * @param {any} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @param {*} info 
 */
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({
    data: {
      ...args, password 
    }
  })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

/**
 * Log In
 * @param {any} parent 
 * @param {*} args 
 * @param {{ prisma: Prisma }} context 
 * @param {*} info 
 */
async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ 
    where: {
      email: args.email
    }
  })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid Password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

module.exports = {
  addExercise,
  updateExercise,
  deleteExercise,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  addExercisesOnWorkouts,
  updateExercisesOnWorkouts,
  deleteExercisesOnWorkouts,
  addSetTarget,
  updateSetTarget,
  deleteSetTarget,
  signup,
  login,
}

