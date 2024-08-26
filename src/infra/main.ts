import { NestFactory } from '@nestjs/core'

import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module.js'
import { Env } from './env.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService: ConfigService<Env, true> = app.get(ConfigService)
  const port = configService.get('PORT', { infer: true })
  await app.listen(port)
}
bootstrap()
