import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class AppController {
  private readonly clientId = '30878566';
  private accessToken = '';

  @Post()
  async createEntity(@Body() body: any): Promise<{ id: number }> {
    // Check if access token is available, otherwise get a new one
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    // Determine which entity type to create based on the request body
    const entityType = body.entityType;
    const entityData = body.entityData;

    // Make POST request to amoCRM API to create entity
    const response = await axios({
      method: 'POST',
      url: `https://${this.accessToken}.amocrm.ru/api/v4/${entityType}s`,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      data: entityData
    });

    // Return the ID of the created entity
    const id = response.data.id;
    return { id };
  }

  private async getAccessToken(): Promise<void> {
    const response = await axios({
      method: 'GET',
      url: 'https://test.gnzs.ru/oauth/get-token.php',
      headers: {
        'X-Client-Id': this.clientId,
        'Content-Type': 'application/json'
      }
    });

    this.accessToken = response.data.access_token;
  }
}