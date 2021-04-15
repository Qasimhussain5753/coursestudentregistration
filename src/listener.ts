import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqps://ngtngprk:X--bC6Op5g043_R7WGGKeAugljmsz7f9@mustang.rmq.cloudamqp.com/ngtngprk',
      ],
      queue: 'course_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.listen(() => {
    console.log('Microservices is listening', process.env.APP_PORT);
  });
}
bootstrap();
