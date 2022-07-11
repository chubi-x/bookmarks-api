import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmark: BookmarkService) {}
  @UseGuards(JwtGuard)
  @Get()
  getBookmarks() {}
  @Get()
  getBookmarkById() {}

  @Patch()
  editBookmarkById() {}

  @Post()
  createBookmark() {}
  @Delete()
  deleteBookmarkById() {}
}
