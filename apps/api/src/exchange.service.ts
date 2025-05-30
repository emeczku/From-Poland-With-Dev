import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ExchangeService {
  private readonly DUMMY_API_URL = process.env.DUMMY_API_URL;
  private readonly API_KEY = process.env.API_KEY;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getExchangeRate(): Promise<number> {
    if (!this.DUMMY_API_URL || !this.API_KEY) {
      throw new Error(
        'API URL or API Key is not defined in environment variables',
      );
    }

    const cached = await this.cacheManager.get<number>('exchange-rate');
    if (cached) return cached;

    const res = await axios.get(this.DUMMY_API_URL, {
      headers: {
        'x-api-key': this.API_KEY,
      },
    });

    if (!res.data || !res.data.exchange_rate) {
      throw new Error('Invalid response from the exchange rate API');
    }

    const rate = res.data.exchange_rate;
    await this.cacheManager.set('exchange-rate', rate, 60 * 1000);
    return rate;
  }
}
