import { Controller } from '@nestjs/common';
import { AssetsDataApiService } from './assets-data-api.service';

@Controller('assets-data-api')
export class AssetsDataApiController {
  constructor(private assetsDataApiService: AssetsDataApiService) {}
}
