import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresModule } from '@database/postgres/postgres.module';
import { DashboardModule } from './module/dashboard/dashboard.module';
import { HoursModule } from './module/hours/hours.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresModule,
    UserModule,
    AuthModule,
    DashboardModule,
    HoursModule,
  ],
})
export class AppModule {}
