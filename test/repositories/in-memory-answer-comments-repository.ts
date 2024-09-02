import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersCommentsRepository } from '@/domain/forum/application/repositories/answers-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswersCommentsRepository
{
  public items: AnswerComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answersComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answersComment.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const InMemoryAnswerCommentsRepository = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!InMemoryAnswerCommentsRepository) return null

    return InMemoryAnswerCommentsRepository
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) => {
          return student.id.equals(comment.authorId)
        })

        if (!author)
          throw new Error(
            `Author with id ${comment.authorId.toString()} does not exist.`,
          )
        return CommentWithAuthor.create({
          commentId: comment.id,
          authorId: comment.authorId,
          author: author.name,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })
      })

    return answerComments
  }
}
