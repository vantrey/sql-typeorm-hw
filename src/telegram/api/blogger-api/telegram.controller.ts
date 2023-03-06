import {Body, Controller, Post, Req,} from '@nestjs/common';
import {TelegramService} from '../../application/services/telegram.service';
type TPayload = {
  message: {
    text: string
    from: {
      id: number
    }
    chat: {
      id: number
    }
  }

}
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('hook')
  async setHook(
    @Req() req,
    @Body() payload: TPayload,
  ) {
    if(payload.message.text === '123') {
      this.telegramService.sendMessage('321', payload.message.chat.id)
    }
    console.log('payload', payload)

    return
  }
}
