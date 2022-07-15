import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaDbService } from '../prisma_db/prisma_db.service';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

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

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    editBookmarkDto: EditBookmarkDto,
  ) {
    //get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });
    // check if the user owns the bookmark

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('You dont have access to this resource');
    }
    //  edit the bookmark
    return await this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...editBookmarkDto,
      },
    });
  }
  // delete bookmark by id
  async deleteBookmarkById(userId: number, bookmarkId: number) {
    // find the bookmark
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
    // make sure user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException('You dont have acess to this resource');
    // delete the bookmark
    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
