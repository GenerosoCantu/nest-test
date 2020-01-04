import { Injectable } from '@nestjs/common';
import * as config from 'config';

const envVar = config.get('gcs');

@Injectable()
export class AppService {
  getHello(): string {
    const bucket = process.env.bucket || envVar.bucket;
    return `Hello World! ` + bucket;
  }
}
