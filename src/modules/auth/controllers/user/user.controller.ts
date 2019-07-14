import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiImplicitParam, ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user.entity';

import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOkResponse({ type: [User] })
    @Get()
    query(): Promise<User[]> {
        return this.userService.query();
    }

    @ApiOkResponse({ type: User })
    @ApiImplicitParam({ name: 'id', type: String })
    @Get('/:id')
    read(@Param('id') id): Promise<User> {
        return this.userService.read(id);
    }

    @ApiOkResponse({ type: User })
    @ApiCreatedResponse({ type: User })
    @Post()
    create(@Body() body: User): Promise<User> {
        return this.userService.create(body);
    }

    @ApiOkResponse({ type: User })
    @ApiImplicitParam({ name: 'id', type: String })
    @Put('/:id')
    update(@Param('id') id, @Body() body: User): Promise<User> {
        return this.userService.update(id, body);
    }

    @ApiOkResponse({ type: DeleteResult })
    @ApiImplicitParam({ name: 'id', type: String })
    @Delete('/:id')
    delete(@Param('id') id): Promise<DeleteResult> {
        return this.userService.delete(id);
    }
}
