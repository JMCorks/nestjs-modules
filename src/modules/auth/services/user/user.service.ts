import { Injectable } from '@nestjs/common';
import { DbEntityHandlerService } from '../../../common/services/db-entity-handler/db-entity-handler.service';
import { User } from '../../models/user.entity';
import { Connection, Repository } from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends DbEntityHandlerService<User> {
    constructor(@InjectConnection() protected readonly connection: Connection, @InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(connection, User);
    }

    public hashPassword(password: String) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());
    }

    public async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email }
        });
    }
}
