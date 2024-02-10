import { Module } from '@nestjs/common';

import { AssetsDataApiModule } from 'assets-data-api';

@Module({
  imports: [AssetsDataApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
