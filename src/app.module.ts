import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityController } from './activity/activity.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [UserModule, ActivityModule, ConfigModule.forRoot()],
  controllers: [ActivityController, UserController],
  providers: [],
})
export class AppModule {}
