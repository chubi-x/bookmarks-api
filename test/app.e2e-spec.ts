import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
describe('App e2e', () => {
  // mount the app module
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it.todo('should pass');
});
