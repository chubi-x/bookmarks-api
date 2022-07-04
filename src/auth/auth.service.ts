import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaDbService } from "src/prisma_db/prisma_db.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
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
        try{
            const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            },
            select: {
                id: true,
                createdAt: true,
                email: true
            }
        })
        //return saved user
        return user;
        }
        catch(err){
            if (err instanceof PrismaClientKnownRequestError){
                if (err.code === "P2002"){
                    throw new ForbiddenException('Credentials are taken')
                }
            }
            throw err
        }
    }
}