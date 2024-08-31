import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { CurrentUser } from '@/infra/auth/current-user-decorator.js'
import { UserPayload } from '@/infra/auth/jwt.strategy.js'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe.js'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'

import { z } from 'zod'

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editAnswerBodySchema))
    body: EditAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content, attachments } = body
    const { sub: userId } = user

    const result = await this.editAnswer.execute({
      attachmentsIds: attachments,
      authorId: userId,
      content,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
