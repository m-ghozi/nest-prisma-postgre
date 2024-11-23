import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostModule {}
