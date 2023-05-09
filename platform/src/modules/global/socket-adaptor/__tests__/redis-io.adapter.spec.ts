import { INestApplication } from '@nestjs/common';
import { Server } from 'socket.io';
import { RedisIoAdapter } from '../redis-io.adapter';
import { InternalConfigService } from '../../config/internal-config.service';

jest.mock('@nestjs/platform-socket.io', () => ({
  IoAdapter: class {
    createIOServer = jest.fn().mockReturnValue({
      adapter: jest.fn().mockReturnValue('123'),
    });
  },
}));

jest.mock('redis', () => ({
  createClient: jest.fn().mockReturnValue({
    on: jest.fn(),
    connect: jest.fn(),
    duplicate: jest.fn().mockReturnValue({
      connect: jest.fn(),
      psubscribe: jest.fn(),
      on: jest.fn(),
      subscribe: jest.fn(),
    }),
  }),
}));

describe('RedisIoAdapter', () => {
  let app: INestApplication;
  let redisIoAdapter: RedisIoAdapter;

  beforeEach(async () => {
    app = {} as INestApplication;
    const internalConfigService = {
      getRedisConfig: jest
        .fn()
        .mockReturnValue({ host: 'localhost', port: 6379 }),
    } as unknown as InternalConfigService;
    app.get = jest.fn().mockReturnValue(internalConfigService);

    redisIoAdapter = new RedisIoAdapter(app);
  });

  it('should create a Socket.IO server with Redis adapter', () => {
    const server = redisIoAdapter.createIOServer(3000);

    expect(server.adapter()).toBeDefined();
  });
});
