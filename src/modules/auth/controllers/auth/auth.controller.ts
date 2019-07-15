import { Controller, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiUseTags } from '@nestjs/swagger';
import { UserCreateInputModel } from '../../models/dtos/user-create-model.input';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOkResponse({ type: String })
    @ApiCreatedResponse({ type: String })
    @Post('login')
    create(@Body() body: UserCreateInputModel): Promise<String> {
        return this.authService.login(body.email, body.password);
    }
}
