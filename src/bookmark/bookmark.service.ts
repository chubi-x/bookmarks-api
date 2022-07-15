import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaDbService } from '../prisma_db/prisma_db.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaDbService) {}
  // create bookmark
  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          userId: userId,
          title: dto.title,
          link: dto.link,
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
  // get all bookmarks
  getBookmarks(userId: number) {
    // console.log(userId);
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }
  // get bookmark by id
  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    return bookmark;
  }

  // edit bookmark by id

  editBookmarkById() {}

  deleteBookmarkById() {}
}
