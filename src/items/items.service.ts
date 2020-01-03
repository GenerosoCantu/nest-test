import { Model } from 'mongoose';
import { Injectable, HttpService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/item.interface'
import { map } from 'rxjs/operators';
import * as config from 'config';
import { Storage } from '@google-cloud/storage';

const envVar = config.get('gcs');

@Injectable()
export class ItemsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel('Item') private readonly itemModel: Model<Item>,

  ) { }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    const found = await this.itemModel.findOne({ _id: id });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  external(): any {
    return this.httpService.get('https://api.github.com/users/gcantuw')
      .pipe(
        map(response => response.data)
      );
  }

  async uploadFile(file) {

    const private_key = process.env.private_key || envVar.private_key;
    const storage = new Storage({
      credentials: {
        client_email: process.env.client_email || envVar.client_email,
        private_key: private_key.replace(/\\n/g, '\n')
      },
      projectId: process.env.project_id || envVar.project_id
    });

    //storage.getBuckets().then(x => console.log(x));

    const bucket = storage.bucket(process.env.bucket || envVar.bucket);
    const blobStream = bucket.file('a/' + file[0].originalname).createWriteStream({
      resumable: false,
      gzip: true
    })

    blobStream.end(file[0].buffer);

    return { file: file[0].originalname };
  }


}
