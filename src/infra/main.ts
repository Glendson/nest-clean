import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module.js'
import { EnvService } from './env/env.service.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const envService = app.get(EnvService)
  const port = envService.get('PORT')
  await app.listen(port)
}
bootstrap()
