import { Controller, Post, Req, Res, HttpStatus, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user/login')      
export class LoginController {
    constructor(private readonly userService: UserService){}

    @Post()
    async userLogin(@Req() request, @Res() response){
        const user = await this.userService.userLogin(request);
        return response.status(HttpStatus.CREATED).json(user)
    }

    @Get()
    testtest():String{
        return "Salom aka sohib";
    }
}
