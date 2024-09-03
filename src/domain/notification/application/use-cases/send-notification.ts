import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Either, right } from '@/core/either.js'
import { Notification } from '../../enterprise/entities/notification.js'
import { NotificationsRepository } from '../repositories/notifications-repository.js'
import { Injectable } from '@nestjs/common'

interface SendNotificationUseCaseRequest {
  title: string
  content: string
  recipientId: string
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      content,
      title,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
