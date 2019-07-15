import { ApiModelProperty } from '@nestjs/swagger';

export class UserCreateInputModel {
    @ApiModelProperty({ type: String })
    email: string;

    @ApiModelProperty({ type: String })
    password: string;
}