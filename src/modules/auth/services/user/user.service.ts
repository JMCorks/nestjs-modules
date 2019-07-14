import { Injectable } from '@nestjs/common';
import { DbEntityHandlerService } from '../../../common/services/db-entity-handler/db-entity-handler.service';
import { User } from '../../models/user.entity';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class UserService extends DbEntityHandlerService<User> {
    constructor(@InjectConnection() protected readonly connection: Connection) {
        super(connection, User);
    }
}
