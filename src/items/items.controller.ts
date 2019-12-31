import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { ValidationPipe, ParseUUIDPipe, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { Storage } from '@google-cloud/storage';

// import { ApolloServer } from 'apollo-server-express';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService
  ) { }

  // @Get()
  // findAll(): any {
  //   return this.itemsService.external();
  // }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files) {
    //console.log(files);

    let str1 = new String(__dirname);

    const storage = new Storage({
      credentials: {
        client_email: process.env.client_email,
        private_key: process.env.private_key
      },
      projectId: process.env.projectId
    });
    //process.env.projectId
    //storage.getBuckets().then(x => console.log(x));

    const bucket = storage.bucket('joornalo-bucket-1');

    const blobStream = bucket.file(files[0].originalname).createWriteStream({
      resumable: false,
      gzip: true
    })

    blobStream.end(files[0].buffer);

    return { file: files[0].originalname };
  }

}
