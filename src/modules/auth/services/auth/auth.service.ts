import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../models/user.entity';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../../jwt.constants';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    public async login(email: string, password: string): Promise<string> {
        const user: User = await this.userService.getUserByEmail(email);
        if (user && user.comparePassword(password)) {
            return jwt.sign({ id: user.id, email: user.email }, jwtConstants.secret);
        } else {
            throw new UnauthorizedException();
        }
    }
}
