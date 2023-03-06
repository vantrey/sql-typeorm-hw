import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ConfigurationType} from '../../../config/configuration';
import axios, {AxiosInstance} from 'axios';

@Injectable()
export class TelegramService {
  axiosInstance: AxiosInstance

  constructor(configService: ConfigService<ConfigurationType, true>) {
    const botSecret = configService.get('telegramSettings', {infer: true}).secret

    this.axiosInstance = axios.create({
      baseURL: `https://api.telegram.org/bot${botSecret}`
    })
  }

  async sendMessage(message: string, recipientId: number) {
    await this.axiosInstance.post(`sendMessage`, {
      chat_id: recipientId,
      text: message
    })
  }

  async setHook(url: string) {
    await this.axiosInstance.post(`setWebhook`, {
      url
    })
  }
}
