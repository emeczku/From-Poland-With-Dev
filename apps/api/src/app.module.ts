import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CacheModule.register(), ConfigModule.forRoot()],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class AppModule {}
