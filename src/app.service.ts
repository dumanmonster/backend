import { AxiosResponse } from './../../frontend/node_modules/axios/index.d';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ResponseDto } from './response.dto';

@Injectable()
export class AmoCRMService {
  private readonly clientId = '30878566';
  private accessToken = '';
  private baseDomain = '';

  async createEntity(
    entityType: string,
    entityData: [{ name: string }],
  ): Promise<{ id: number }> {
    // Check if access token is available, otherwise get a new one
    if (!this.accessToken || !this.baseDomain) {
      await this.getAccessToken();
    }

    // Make POST request to amoCRM API to create entity
    const response: AxiosResponse<ResponseDto> = await axios.post(
      `https://${this.baseDomain}/api/v4/${entityType}s`,
      entityData,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = response.data;
    let id = 0;
    switch (entityType) {
      case 'lead':
        const leads = data?._embedded?.leads;
        if (leads && leads.length) {
          id = leads[0].id;
        }
        break;
      case 'companie':
        const companies = data?._embedded?.companies;
        if (companies && companies.length) {
          id = companies[0].id;
        }
        break;
      case 'contact':
        const contacts = data?._embedded?.contacts;
        if (contacts && contacts.length) {
          id = contacts[0].id;
        }
        break;
      default:
        break;
    }

    return { id };
  }

  private async getAccessToken(): Promise<void> {
    const response = await axios({
      method: 'GET',
      url: 'https://test.gnzs.ru/oauth/get-token.php',
      headers: {
        'X-Client-Id': this.clientId,
        'Content-Type': 'application/json',
      },
    });

    this.accessToken = response.data.access_token;
    this.baseDomain = response.data.base_domain;
  }
  async getAccessTokenAndDomain(): Promise<any> {
    const response = await axios({
      method: 'GET',
      url: 'https://test.gnzs.ru/oauth/get-token.php',
      headers: {
        'X-Client-Id': this.clientId,
        'Content-Type': 'application/json',
      },
    });
    const access_token = response.data.access_token;
    const base_domain = response.data.base_domain;

    return { access_token, base_domain };
  }
}
