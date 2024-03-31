import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  private postRepository = this.prisma.extendedClient.post;

  async create(data: Prisma.PostUncheckedCreateInput) {
    return this.postRepository.create({ data });
  }

  async update(id: number, data: Prisma.PostUncheckedUpdateInput) {
    return this.postRepository.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.postRepository.softDelete({ id });
  }

  async findUniqueOrThrow(id: number) {
    const post = await this.postRepository.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('아이디가 존재하지 않습니다.');
    return post;
  }

  async findMany() {
    return this.postRepository.findMany();
  }
}
