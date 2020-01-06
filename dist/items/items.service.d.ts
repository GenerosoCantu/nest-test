import { Model } from 'mongoose';
import { HttpService } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
export declare class ItemsService {
    private readonly httpService;
    private readonly itemModel;
    constructor(httpService: HttpService, itemModel: Model<Item>);
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    create(item: Item): Promise<Item>;
    delete(id: string): Promise<Item>;
    update(id: string, item: Item): Promise<Item>;
    external(): any;
    uploadFile(file: any): Promise<void>;
}
