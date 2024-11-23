import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post as CPost } from '@prisma/client';
import { ExpreesRequestWithUser } from '../users/interfaces/express-request-with-user.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdatePostDto } from './dtos/update-post.dto';
import { IsMineGuard } from 'src/common/guards/is-mine.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Request() req: ExpreesRequestWithUser,
  ): Promise<CPost> {
    createPostDto.authorId = req.user.sub;
    return this.postsService.createPost(createPostDto);
  }

  @Public()
  @Get()
  getAllPosts(): Promise<CPost[]> {
    return this.postsService.getAllPosts();
  }

  @Public()
  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number): Promise<CPost> {
    return this.postsService.getPostById(id);
  }

  @Patch(':id')
  @UseGuards(IsMineGuard) // <--- 💡 Prevent user from updating other user's posts
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<CPost> {
    return this.postsService.updatePost(+id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(IsMineGuard) // <--- 💡 Prevent user from deleting other user's posts
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.postsService.deletePost(+id);
  }
}
