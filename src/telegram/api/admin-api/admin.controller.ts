import {Controller, Delete, HttpCode, Post, Res,} from '@nestjs/common';
import {Response} from 'express';

@Controller('')
export class AdminController {

  @HttpCode(201)
  @Post('sa/users')
  async createUser() {
    return {
      "id": "string",
      "login": "string",
      "email": "string",
      "createdAt": "2023-05-11T10:33:45.218Z",
      "banInfo": {
        "isBanned": false,
        "banDate": null,
        "banReason": null
      }
    }
  }

  @HttpCode(200)
  @Post('auth/login')
  async login(@Res({ passthrough: true }) response: Response) {
    response.cookie('refreshToken', 'sdfgsdfgsd.sdfg', {secure: true, httpOnly: true})
    response.send({
      accessToken: "stri.ng"
    })
    return
  }

  @HttpCode(204)
  @Delete('testing/all-data')
  async deleteAllData() {
    console.log('DELETE')
  }
}
