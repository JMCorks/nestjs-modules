import { Entity, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

import { DbUUIDModel } from '../../common/models/db-uuid-model';

@Entity()
export class SomeModel extends DbUUIDModel {
    @ApiModelProperty({ type: String })
    @Column()
    someProperty: string;
}