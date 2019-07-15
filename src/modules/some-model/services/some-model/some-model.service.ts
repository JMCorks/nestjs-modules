import { Injectable } from '@nestjs/common';
import { DbEntityHandlerService } from 'src/modules/common/services/db-entity-handler/db-entity-handler.service';
import { SomeModel } from '../../models/some-model.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class SomeModelService extends DbEntityHandlerService<SomeModel> {
    constructor(@InjectConnection() protected readonly connection: Connection) {
        super(connection, SomeModel);
    }
}
