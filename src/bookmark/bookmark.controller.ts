import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../../src/auth/decorator';
import { JwtGuard } from '../../src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmark: BookmarkService) {}

  @UseGuards(JwtGuard)
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmark.createBookmark(userId, dto);
  }

  @Get()
  getBookmarks() {
    return this.bookmark.getBookmarks();
  }
  @Get()
  getBookmarkById(@GetUser('id') userId: number) {}

  @Patch()
  editBookmarkById(@GetUser('id') userId: number) {}

  @Delete()
  deleteBookmarkById(@GetUser('id') userId: number) {}
}
