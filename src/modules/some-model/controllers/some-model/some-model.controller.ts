import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiImplicitParam, ApiCreatedResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { SomeModelService } from '../../services/some-model/some-model.service';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { SomeModel } from '../../models/some-model.entity';

@Controller('some-model')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUseTags('SomeModel')
export class SomeModelController {
    constructor(private readonly someModelService: SomeModelService) { }

    @ApiOkResponse({ type: [SomeModel] })
    @Get()
    query(): Promise<SomeModel[]> {
        return this.someModelService.query();
    }

    @ApiOkResponse({ type: SomeModel })
    @ApiImplicitParam({ name: 'id', type: String })
    @Get('/:id')
    read(@Param('id') id): Promise<SomeModel> {
        return this.someModelService.read(id);
    }

    @ApiOkResponse({ type: SomeModel })
    @ApiCreatedResponse({ type: SomeModel })
    @Post()
    create(@Body() body: SomeModel): Promise<SomeModel> {
        return this.someModelService.create(body);
    }

    @ApiOkResponse({ type: SomeModel })
    @ApiImplicitParam({ name: 'id', type: String })
    @Put('/:id')
    update(@Param('id') id, @Body() body: SomeModel): Promise<SomeModel> {
        return this.someModelService.update(id, body);
    }

    @ApiOkResponse({ type: DeleteResult })
    @ApiImplicitParam({ name: 'id', type: String })
    @Delete('/:id')
    delete(@Param('id') id): Promise<DeleteResult> {
        return this.someModelService.delete(id);
    }
}