import { Injectable } from '@nestjs/common';
import { Connection, Repository, DeleteResult, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InjectConnection } from '@nestjs/typeorm';
import { DbUUIDModel } from '../../models/db-uuid-model';
import * as uuid from 'uuid/v4';

@Injectable()
export class DbEntityHandlerService<T extends DbUUIDModel> {
    protected repository: Repository<T>;

    constructor(@InjectConnection() protected readonly connection: Connection, modelType: any) {
        this.repository = this.connection.getRepository(modelType);
    }

    create(entityData: Partial<T>): Promise<T> {
        const newInstance = this.repository.create(this.convertDeeppartial(entityData));
        newInstance.id = uuid();
        this.repository.insert(this.convertQueryDeeppartial(newInstance));

        return this.read(newInstance.id);
    }

    async update(id: string, entityData: Partial<T>): Promise<T> {
        if (id) {
            entityData.id = id;
        }

        await this.repository.update(id, this.convertQueryDeeppartial(entityData));
        return this.read(id);
    }

    read(id: string): Promise<T> {
        return this.repository.findOne(id);
    }

    query(): Promise<Array<T>> {
        return this.repository.find();
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

    private convertDeeppartial(model: Partial<T>): DeepPartial<T> {
        //Dummy cast to avoid DeepPartial error... Fix later
        const convertedInstance: DeepPartial<T> = { ...model } as any;
        return convertedInstance;
    }

    private convertQueryDeeppartial(model: Partial<T>): QueryDeepPartialEntity<T> {
        //Dummy cast to avoid QueryDeepPartialEntity error... Fix later
        const convertedInstance: QueryDeepPartialEntity<T> = { ...model } as any;
        return convertedInstance;
    }
}
