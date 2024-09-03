import { Notification } from '../../enterprise/entities/notification'

export abstract class NotificationsRepository {
  abstract save(notification: Notification): Promise<void>
  abstract create(notification: Notification): Promise<void>
  abstract findById(id: string): Promise<Notification | null>
}
