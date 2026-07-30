import { AxiosResponse } from 'axios';
import { sleep } from '@//utils';

export async function mockRequest<T>(data: T, delay = 400): Promise<AxiosResponse<T>> {
  await sleep(delay);
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  };
}
