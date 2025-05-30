import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

interface ExchangeTransactionDto {
  amountEur: number;
}

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('rate')
  async getRate() {
    const rate = await this.exchangeService.getExchangeRate();
    return { rate };
  }

  @Post('convert')
  async convert(@Body() body: ExchangeTransactionDto) {
    const rate = await this.exchangeService.getExchangeRate();
    const amountPln = body.amountEur * rate;

    const transaction = {
      amountEur: body.amountEur,
      amountPln,
      rate,
      timestamp: new Date(),
    };

    return transaction;
  }
}
