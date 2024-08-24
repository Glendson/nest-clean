import { AppModule } from '@/app.module.js'
import { PrismaService } from '@/prisma/prisma.service.js'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'john doe',
      email: 'john@example.com',
      password: 'password',
    })

    expect(response.statusCode).toBe(201)

    const userDatabase = await prisma.user.findUnique({
      where: {
        email: 'john@example.com',
      },
    })

    expect(userDatabase).toBeTruthy()
  })
})
