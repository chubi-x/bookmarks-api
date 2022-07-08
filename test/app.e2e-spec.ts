import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';
import { AppModule } from '../src/app.module';
describe('App e2e', () => {
  // create app variable
  let app: INestApplication;
  let prisma: PrismaDbService;
  // mount the app module
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // create the nest application
    app = moduleRef.createNestApplication();
    // use global pipes
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    prisma = app.get(PrismaDbService);
    prisma.cleanDb();
  });
  // close the app after running all tests
  afterAll(() => {
    app.close();
  });
  it.todo('should pass');
});
