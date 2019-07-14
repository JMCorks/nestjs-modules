import * as bcrypt from 'bcrypt';
import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

import { IDbUUIDModel } from '../../common/models/db-uuid-model';

@Entity()
export class User implements IDbUUIDModel {
    @ApiModelPropertyOptional({ type: String })
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ApiModelProperty({ type: String })
    @Column()
    email: string;

    @ApiModelPropertyOptional({ type: String })
    @Column({ nullable: true })
    password?: string;

    @BeforeInsert()
    cryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
    }

    comparePassword(cleanPassword) {
        bcrypt.compareSync(cleanPassword, this.password);
    }
}