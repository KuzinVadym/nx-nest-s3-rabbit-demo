import { Module } from '@nestjs/common';
import { AssetsDataClientService } from './assets-data-client.service';

@Module({
    controllers: [],
    providers: [AssetsDataClientService],
    exports: [AssetsDataClientService],
})
export class AssetsDataClientModule {}
