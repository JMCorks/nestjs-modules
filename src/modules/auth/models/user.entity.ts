import * as bcrypt from 'bcrypt';
import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { DbUUIDModel } from '../../common/models/db-uuid-model';

@Entity()
export class User extends DbUUIDModel {
    @ApiModelProperty({ type: String })
    @Column()
    email: string;

    @Exclude()
    @Column({ nullable: true })
    password: string;

    @BeforeInsert()
    cryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
    }

    comparePassword(cleanPassword): boolean {
        //return bcrypt.compareSync(cleanPassword, this.password);
        return cleanPassword === this.password;
    }
}