import { Controller } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
}
