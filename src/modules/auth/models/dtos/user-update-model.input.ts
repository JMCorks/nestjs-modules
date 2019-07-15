import { ApiModelProperty } from '@nestjs/swagger';

export class UserUpdateInputModel {
    @ApiModelProperty({ type: String })
    email: string;

    @ApiModelProperty({ type: String })
    password: string;
}