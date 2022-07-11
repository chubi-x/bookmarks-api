import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmark: BookmarkService) {}
  @UseGuards(JwtGuard)
  @Get()
  getBookmarks(@GetUser('id') userId: number) {}
  @Get()
  getBookmarkById(@GetUser('id') userId: number) {}

  @Patch()
  editBookmarkById(@GetUser('id') userId: number) {}

  @Post()
  createBookmark(@GetUser('id') userId: number) {}
  @Delete(@GetUser('id') userId : number)
  deleteBookmarkById() {}
}
