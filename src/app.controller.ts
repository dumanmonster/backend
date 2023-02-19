import { Controller, Post, Body, Get } from '@nestjs/common';
import { AmoCRMService } from './app.service';
import { BodyDto } from './body.dto';

@Controller('entities')
export class EntitiesController {
  constructor(private readonly amoCRMService: AmoCRMService) {}

  @Post()
  async createEntity(@Body() body: BodyDto): Promise<{ id: number }> {
    // Determine which entity type to create based on the request body
    const entityType = body.entityType;
    const entityData = body.entityData;

    // Use the AmoCRMService to create the entity
    return this.amoCRMService.createEntity(entityType, entityData);
  }
}
