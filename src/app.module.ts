import 'dotenv/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { authorizationMiddleware } from './authorization.middleware';
import { GymModule } from './gym/gym.module';
import { GymController } from './gym/gym.controller';
import { SessionController } from './session/session.controller';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    GymModule,
    SessionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authorizationMiddleware).forRoutes(GymController);
    consumer.apply(authorizationMiddleware).forRoutes(SessionController);
    consumer
      .apply(authorizationMiddleware)
      .exclude({ path: 'api/v1/user', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
