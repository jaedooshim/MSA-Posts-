import { ForbiddenException, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async create(data: Prisma.PostUncheckedCreateInput) {
    await this.postRepository.create(data);
    return '게시물 생성이 완료되었습니다.';
  }

  async updateOwn(
    id: number,
    userId: number,
    data: Prisma.PostUncheckedUpdateInput,
  ) {
    const post = await this.postRepository.findUniqueOrThrow(id);
    if (post.userId !== userId)
      throw new ForbiddenException('게시물 수정권한이 없습니다.');
    await this.postRepository.update(id, data);
    return '게시물 수정이 완료되었습니다.';
  }

  async deleteOwn(id: number, userId: number) {
    const post = await this.postRepository.findUniqueOrThrow(id);
    if (post.userId !== userId)
      throw new ForbiddenException('게시물 삭제권한이 없습니다.');
    await this.postRepository.delete(id);
    return '게시물 삭제가 완료되었습니다.';
  }

  async findUnique(id: number) {
    return await this.postRepository.findUniqueOrThrow(id);
  }

  async findMany() {
    return await this.postRepository.findMany();
  }
}
