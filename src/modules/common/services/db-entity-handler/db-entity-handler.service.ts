import { Injectable } from '@nestjs/common';
import { Connection, Repository, DeleteResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class DbEntityHandlerService<T> {
    protected repository: Repository<T>;

    constructor(@InjectConnection() protected readonly connection: Connection, modelType: any) {
        this.repository = this.connection.getRepository(modelType);
    }

    create(entityData: T): Promise<T> {
        const newInstance = this.repository.create(entityData);
        return this.repository.save(newInstance);
    }

    update(id: string, entityData: QueryDeepPartialEntity<T>): Promise<T> {
        this.repository.update(id, entityData);
        return this.read(id);
    }

    read(id: string): Promise<T> {
        return this.repository.findOne(id);
    }

    delete(id: string): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
