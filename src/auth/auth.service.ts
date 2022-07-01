import { Injectable } from "@nestjs/common";
import { PrismaDbService } from "src/prisma_db/prisma_db.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
@Injectable()
export class AuthService{
    constructor(private prisma: PrismaDbService){
        
    }
    signin(){
        
        return {msg: 'sign me in scotty'};
    }
    async signup(dto: AuthDto){
        //generate password hash
        const hash = await argon.hash(dto.password);
        //save new user in db
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            }
        })
        //return saved user
        return user;
    }
}