import { APIRequestContext, APIResponse } from '@playwright/test';

export interface ApiCallResult {
  status: number;
  body: any;
  headers: Record<string, string>;
}

export class ReqResClient {
  constructor(private readonly api: APIRequestContext) {}

  async get(path: string): Promise<ApiCallResult> {
    const response = await this.api.get(path, { failOnStatusCode: false });
    return this.toCallResult(response);
  }

  async post(path: string, data?: unknown): Promise<ApiCallResult> {
    const response = await this.api.post(path, { data, failOnStatusCode: false });
    return this.toCallResult(response);
  }

  async put(path: string, data?: unknown): Promise<ApiCallResult> {
    const response = await this.api.put(path, { data, failOnStatusCode: false });
    return this.toCallResult(response);
  }

  async delete(path: string): Promise<ApiCallResult> {
    const response = await this.api.delete(path, { failOnStatusCode: false });
    return this.toCallResult(response);
  }

  private async toCallResult(response: APIResponse): Promise<ApiCallResult> {
    const rawBody = await response.text();
    let body: any = null;

    if (rawBody) {
      try {
        body = JSON.parse(rawBody);
      } catch {
        body = rawBody;
      }
    }

    return {
      status: response.status(),
      body,
      headers: response.headers()
    };
  }
}