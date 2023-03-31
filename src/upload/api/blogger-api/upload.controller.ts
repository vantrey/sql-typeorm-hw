import {
  Body,
  Controller, Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageAdapter } from '../../application/adapters/storage.adapter';

@Controller('blogger/blogs')
export class UploadController {
  constructor(private readonly storageAdapter: StorageAdapter) {}

  @Get()
  async get() {
    return {
      hh: '123'
    }
  }

  @Post(':id/images/wallpaper')
  //@UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req,
    @Param('id') id: string,
    //@UploadedFile()
    //file: Express.Multer.File,
  ) {
    console.log(req.headers)
    //console.log('file', file);
    //const result = await this.storageAdapter.saveFile(file.buffer, '1', '1.jpg');

    return {
      wallpaper: {
        url: `https://backettest.storage.yandexcloud.net/${'result.url'}`,
        width: 0,
        height: 0,
        fileSize: 0,
      },
      main: [],
    };
  }
}
