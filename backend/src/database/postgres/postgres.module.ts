import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/module/user/entities/user.entity';
import { Hour } from 'src/module/hours/entities/hour.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // ou postgres, etc
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          User,
          Hour,
          // __dirname + '/../**/*.entity{.ts,.js}'
        ],
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresModule {}
