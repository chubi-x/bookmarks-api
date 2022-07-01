import { Injectable, Req } from "@nestjs/common";
import { PrismaDbService } from "src/prisma_db/prisma_db.service";
import { Request } from "express";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaDbService){
        
    }
    signin(){
        
        return {msg: 'sign me in scotty'};
    }
    signup(){
        // console.log(req.body)
        return {msg: 'sign me up scotty'};
    }
}