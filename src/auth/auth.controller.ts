import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    // create sign up and sign in endpoints
    @Post('signup')
    signup(){
        return 'sign up route'
    }

    @Post('signin')
    signin(){
        return 'sign in route'
    }
}