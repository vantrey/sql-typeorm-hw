import {Body, Controller, Get, HttpCode, Param, Post, Req,} from '@nestjs/common';
import {TelegramService} from '../../application/services/telegram.service';

const mockBD = {
  user1TId: null as null | number,
  user1TCode: '',
  blog1Name: '',
  blog1Id: ''
}

type TPayload = {
  message: {
    text: string
    from: {
      id: number
    }
    chat: {
      id: number
    }
    entities: object[]
  }

}
@Controller('')
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post('blogger/blogs')
  createBlogMock(@Body() body: any) {
    mockBD.blog1Name = body.name
    mockBD.blog1Id = '123123123'

    return {
      id: mockBD.blog1Id,
      name: body.name,
      description: body.description,
      websiteUrl: body.websiteUrl,
      createdAt: "2023-05-11T09:36:27.783Z",
      isMembership: true,
      images: {
        wallpaper: {
          url: "string",
          width: 0,
          height: 0,
          fileSize: 0
        },
        main: [
          {
            url: "string",
            width: 0,
            height: 0,
            fileSize: 0
          }
        ]
      }
    }
  }

  @Post('blogs/:id/subscription')
  subscribeBlogMock(@Param() params) {
    if(params.id === mockBD.blog1Id) {
      mockBD.user1TCode = 'user1-code'
    }

    return
  }

  @Get('integrations/telegram/auth-bot-link')
  authLinkMock() {

    return { link: `https://t.me/bot_lesson_lesson_bot?code=${mockBD.user1TCode}` }
  }

  @HttpCode(201)
  @Post('blogger/blogs/:id/posts')
  async sendMock(@Param() params) {

    try {
      if(params.id === mockBD.blog1Id) {
        console.log('SEND!!!!!')
        await this.telegramService.sendMessage(`new post for `, mockBD.user1TId as number)
      }

      return {
        "id": "string",
        "title": "string",
        "shortDescription": "string",
        "content": "string",
        "blogId": "string",
        "blogName": "string",
        "createdAt": "2023-05-11T10:22:50.952Z",
        "extendedLikesInfo": {
          "likesCount": 0,
          "dislikesCount": 0,
          "myStatus": "None",
          "newestLikes": []
        },
        "images": {
          "main": []
        }
      }
    } catch (e) {
      console.log('CATCH')
      console.log(e)
      return
    }
  }

  @Post('telegram/hook')
  async setHook(
    @Req() req,
    @Body() payload: TPayload,
  ) {
    if(payload.message?.text === `/start code=${mockBD.user1TCode}`) {
      mockBD.user1TId = payload.message.chat.id
    }
    console.log('payload.message.chat.id', payload?.message?.chat?.id)
    console.log('payload.message.text', payload?.message?.text)
    console.log('payload', payload)

    return
  }
}
