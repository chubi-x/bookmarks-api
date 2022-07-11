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
    // function to test if body parameters are empty
    const reqBodyTest = (
      endpoint: string,
      bodyParam: string,
      inspect: boolean,
    ) => {
      // should throw error if parameter is empty
      it(`should throw if ${bodyParam} empty`, () => {
        //create object to go into wtihBody method
        const bodyObject = {
          firstName: dto.firstName,
          lastName: dto.lastName,
          password: dto.password,
          email: dto.email,
        };
        // retreive body object keys
        const keys = Object.keys(bodyObject);
        // check if key is equal to specified body parameter and remove key from body object
        keys.forEach((key) => {
          if (bodyParam === key) {
            delete bodyObject[key];
          }
        });
        // constant to hold pactum spec
        const test = pactum
          .spec()
          .post(`/auth/${endpoint}`)
          .withBody(bodyObject)
          .expectStatus(400);
        // return inspect if specified in func argument
        if (inspect) return test.inspect();
        else return test;
      });
    };
    describe('Sign Up', () => {
      // if email empty
      reqBodyTest('signup', 'email', false);
      // if password empty
      reqBodyTest('signup', 'password', false);

      // if first name empty
      reqBodyTest('signup', 'firstName', false);

      // if last name empty
      reqBodyTest('signup', 'lastName', false);

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should sign up', () => {
        // create dto object to test sign up
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
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
      // if email empty
      reqBodyTest('signin', 'email', false);
      // if password empty
      reqBodyTest('signin', 'password', false);

      // if first name empty
      reqBodyTest('signin', 'firstName', false);

      // if last name empty
      reqBodyTest('signin', 'lastName', true);

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });
  });
});
