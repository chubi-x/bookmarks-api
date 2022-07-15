import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaDbService } from '../src/prisma_db/prisma_db.service';
import { AppModule } from '../src/app.module';
import { SignupDto, LoginDto } from '../src/auth/dto';
import { EditUserDto, EditUserPasswordDto } from '../src/user/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';
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
    const dto: SignupDto = {
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
        const loginDto: LoginDto = {
          email: 'chubi1234@gmail.com',
          password: '12345',
        };
        // create dto object to test sign up
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(loginDto)
          .expectStatus(200)
          .stores('userToken', 'access_token');
      });
      // if email empty
      reqBodyTest('signin', 'email', false);
      // if password empty
      reqBodyTest('signin', 'password', false);

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });
    describe('User', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders('Authorization', 'Bearer $S{userToken}')
          .expectStatus(200);
      });
      it('Should edit user', () => {
        const editUserDto: EditUserDto = {
          email: 'chubiX@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users/me/edit')
          .withHeaders('Authorization', 'Bearer $S{userToken}')
          .withBody(editUserDto)
          .expectStatus(200)
          .expectBodyContains(editUserDto.email);
      });
      it('Should edit user password', async () => {
        const editPasswordDto: EditUserPasswordDto = {
          password: '1234',
        };
        return pactum
          .spec()
          .patch('/users/me/change_password')
          .withHeaders('Authorization', 'Bearer $S{userToken}')
          .withBody(editPasswordDto)
          .expectStatus(200);
      });
      it('Should sign in after password change', () => {
        const newSignInDto: EditUserPasswordDto = {
          password: '1234',
        };
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'chubiX@gmail.com',
            password: newSignInDto.password,
          })
          .expectStatus(200);
      });
    });
  });
  describe('Bookmarks', () => {
    describe('Create bookmarks', () => {
      it('should create bookmark', () => {
        const dto: CreateBookmarkDto = {
          title: 'test bookmark',
          link: 'https://google.com',
        };
        return pactum
          .spec()
          .post('/bookmarks/new')
          .withHeaders('Authorization', 'Bearer $S{userToken}')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Get bookmarks', () => {
      it('should get Bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders('Authorization', 'Bearer $S{userToken}')
          .expectStatus(200)
          .inspect();
      });
    });
    it('Get Bookmark by Id', () => {});

    it('Edit Bookmark by Id', () => {});
    it('Delete Bookmark by Id', () => {});
  });
});
