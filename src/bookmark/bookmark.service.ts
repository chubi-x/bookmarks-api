import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaDbService) {}
  getBookmarks() {}
  getBookmarkById() {}

  editBookmarkById() {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          userId: userId,
          title: dto.title,
          link: dto.url,
          description: dto.description,
        },
      });
      return bookmark;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Bookmark Exists');
        }
      }
      throw err;
    }
  }
  deleteBookmarkById() {}
}
