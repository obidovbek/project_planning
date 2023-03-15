import { Controller, Post, Req, Res, HttpStatus, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user/signup')
export class SignUpController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Req() request, @Res() response){
        console.log(request.body)
        const newUser = await this.userService.createUser(request);
        return response.status(HttpStatus.CREATED).json(newUser)
    }
}
