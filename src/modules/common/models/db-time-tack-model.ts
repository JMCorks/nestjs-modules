import { ApiModelPropertyOptional } from "@nestjs/swagger";
import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export class DbTimeTackTModel {
    @ApiModelPropertyOptional({ type: Date })
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @ApiModelPropertyOptional({ type: Date })
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}