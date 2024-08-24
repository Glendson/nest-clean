import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL)
    throw new Error('Please provider a DATABASE_URL environment variable.')

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const generateSchemaId = randomUUID()

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseUrl(generateSchemaId)

  process.env.DATABASE_URL = databaseUrl

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${generateSchemaId}" CASCADE`,
  )
  await prisma.$disconnect()
})
