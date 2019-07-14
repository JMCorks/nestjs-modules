import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
import { DbTimeTackTModel } from "./db-time-tack-model";

export class DbUUIDModel extends DbTimeTackTModel {
    @ApiModelPropertyOptional({ type: String })
    @PrimaryGeneratedColumn('uuid')
    id?: string;
}