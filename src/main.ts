import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {addGlobalPipeToApp} from './utils/main-settings';
import {AllExceptionsFilter} from './utils/all-exceptions-filter';
import ngrok from 'ngrok'
import {ConfigService} from '@nestjs/config';
import {ConfigurationType} from './config/configuration';
import cookieParser from 'cookie-parser';
import {TelegramService} from './telegram/application/services/telegram.service';

const ngrokConnect = async (port: number) => {
  return await ngrok.connect({
    addr: port
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter(false));
  addGlobalPipeToApp(app);
  const configService = app.get(ConfigService<ConfigurationType, true>);
  const environmentSettings = configService.get('environmentSettings', { infer: true });
  const apiSettings = configService.get('apiSettings', { infer: true });

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:5001']
  })

  let baseUrl = apiSettings.BASE_URL

  if(environmentSettings.isDevelopment) {
    baseUrl = await ngrokConnect(5005)
  }

    console.log('baseUrl =', baseUrl)
  const telegramService = await app.resolve(TelegramService)
  await telegramService.setHook(`${baseUrl}/telegram/hook`)

  await app.listen(5005);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();