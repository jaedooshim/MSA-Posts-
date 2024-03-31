import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { MessagePattern } from '@nestjs/microservices';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @MessagePattern('create_post')
  async create(body: Prisma.PostUncheckedCreateInput) {
    return await this.postService.create(body);
  }

  @MessagePattern('update_own_post')
  async updateOwn(data: {
    id: number;
    userId: number;
    body: Prisma.PostUncheckedUpdateInput;
  }) {
    return await this.postService.updateOwn(
      data.id,
      data.userId as number,
      data.body,
    );
  }

  @MessagePattern('delete_own_post')
  async deleteOwn(data: { id: number; userId: number }) {
    return await this.postService.deleteOwn(data.id, data.userId);
  }

  @MessagePattern('find_unique_post')
  async findUnique(id: number) {
    return await this.postService.findUnique(id);
  }

  @MessagePattern('find_many_post')
  async findMany() {
    return await this.postService.findMany();
  }
}
