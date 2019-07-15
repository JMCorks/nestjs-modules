import { ApiModelProperty } from "@nestjs/swagger";
import { PrimaryColumn } from "typeorm";
import { DbTimeTackTModel } from "./db-time-tack-model";

export class DbUUIDModel extends DbTimeTackTModel {
    @ApiModelProperty({ type: String })
    @PrimaryColumn('uuid')
    id: string;
}