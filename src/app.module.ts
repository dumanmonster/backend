import { Module } from '@nestjs/common';
import { EntitiesController} from './app.controller';
import { AmoCRMService } from './app.service';


@Module({
  imports: [],
  controllers: [EntitiesController],
  providers: [AmoCRMService],
})
export class AppModule {}
