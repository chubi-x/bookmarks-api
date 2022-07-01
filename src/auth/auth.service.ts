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
    signup(dto: AuthDto){
        // console.log(req.body)
        return {msg: 'sign me up scotty'};
    }
}