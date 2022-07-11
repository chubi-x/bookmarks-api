import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaDbService) {}
  getBookmarks() {}
  getBookmarkById() {}

  editBookmarkById() {}

  createBookmark() {}
  deleteBookmarkById() {}
}
