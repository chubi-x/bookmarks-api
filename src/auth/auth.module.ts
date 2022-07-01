import {Module} from '@nestjs/common'
import { PrismaDbModule } from 'src/prisma_db/prisma_db.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [PrismaDbModule],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule{}