import { Module } from '@nestjs/common';
import { TelegramController } from './api/blogger-api/telegram.controller';
import { TelegramService } from './application/services/telegram.service';

@Module({
  imports: [],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
