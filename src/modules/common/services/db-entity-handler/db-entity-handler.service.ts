import { Injectable } from '@nestjs/common';
import { Connection, Repository, DeleteResult, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InjectConnection } from '@nestjs/typeorm';
import { IDbUUIDModel } from '../../models/db-uuid-model';

@Injectable()
export class DbEntityHandlerService<T extends IDbUUIDModel> {
    protected repository: Repository<T>;

    constructor(@InjectConnection() protected readonly connection: Connection, modelType: any) {
        this.repository = this.connection.getRepository(modelType);
    }

    create(entityData: T): Promise<T> {
        const newInstance = this.repository.create(this.convertDeeppartial(entityData));
        return this.repository.save(this.convertDeeppartial(newInstance));
    }

    async update(id: string, entityData: T): Promise<T> {
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

    private convertDeeppartial(model: T): DeepPartial<T> {
        //Dummy cast to avoid DeepPartial error... Fix later
        const convertedInstance: DeepPartial<T> = { ...model } as any;
        return convertedInstance;
    }

    private convertQueryDeeppartial(model: T): QueryDeepPartialEntity<T> {
        //Dummy cast to avoid QueryDeepPartialEntity error... Fix later
        const convertedInstance: QueryDeepPartialEntity<T> = { ...model } as any;
        return convertedInstance;
    }
}
