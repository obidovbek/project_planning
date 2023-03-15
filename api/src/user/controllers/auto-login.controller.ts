import { Controller, Post, Req, Res, HttpStatus, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user/autologin')      
export class AutoLoginController {
    constructor(
        private readonly userService: UserService,
    ){}
    @Get()
    async testtest(){
        const user = await this.userService.testtest();
        return user
    }
    @Post()
    async userAutoLogin(@Req() request, @Res() response){
        const user = await this.userService.userAutoLogin(request);
        return response.status(user.status).json(user)
    }

}
