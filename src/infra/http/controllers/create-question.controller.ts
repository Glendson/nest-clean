import { CurrentUser } from '@/infra/auth/current-user-decorator.js'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard.js'
import { UserPayload } from '@/infra/auth/jwt.strategy.js'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe.js'
import { PrismaService } from '@/infra/database/prisma/prisma.service.js'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { z } from 'zod'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub: userId } = user
    const slug = ' asd'

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })
  }
}
