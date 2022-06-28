import { Injectable } from "@nestjs/common";
@Injectable({})
export class AuthService{
    signin(){
        return {msg: 'sign me in scotty'};
    }
    signup(){
        return {msg: 'sign me up scotty'};
    }
}