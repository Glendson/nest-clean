import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { CurrentUser } from '@/infra/auth/current-user-decorator.js'
import { UserPayload } from '@/infra/auth/jwt.strategy.js'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe.js'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'

import { z } from 'zod'

const answerQuestionBodySchema = z.object({
  content: z.string(),
})

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(answerQuestionBodySchema))
    body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const { sub: userId } = user

    const result = await this.answerQuestion.execute({
      attachmentsIds: [],
      questionId,
      authorId: userId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
