import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaDbService } from '../src/prisma_db/prisma_db.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto';
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
    // start the server
    await app.listen(3333);
    prisma = app.get(PrismaDbService);
    pactum.request.setBaseUrl('http://localhost:3333');
    await prisma.cleanDb();
  });
  // close the app after running all tests
  afterAll(() => {
    app.close();
  });
  // authentication tests
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'chubi1234@gmail.com',
      password: '12345',
      firstName: 'chubiyojo',
      lastName: 'adejoh',
    };
    describe('Sign Up', () => {
      it('should sign up', () => {
        // create dto object to test sign up
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
    describe('Sign In', () => {
      it('should sign in', () => {
        // create dto object to test sign up
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
});
