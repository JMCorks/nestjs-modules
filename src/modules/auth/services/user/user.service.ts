import { Injectable } from '@nestjs/common';
import { DbEntityHandlerService } from '../../../common/services/db-entity-handler/db-entity-handler.service';
import { User } from '../../models/user.entity';
import { Connection, Repository } from 'typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends DbEntityHandlerService<User> {
    constructor(@InjectConnection() protected readonly connection: Connection, @InjectRepository(User) private readonly userRepository: Repository<User>) {
        super(connection, User);
    }

    public async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email }
        });
    }
}
