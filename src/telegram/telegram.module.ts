import { Module } from '@nestjs/common';
import { TelegramController } from './api/blogger-api/telegram.controller';
import { TelegramService } from './application/services/telegram.service';
import {AdminController} from './api/admin-api/admin.controller';

@Module({
  imports: [],
  providers: [TelegramService],
  controllers: [TelegramController, AdminController],
})
export class TelegramModule {}
