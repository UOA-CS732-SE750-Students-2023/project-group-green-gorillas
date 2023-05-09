import { INestApplication } from '@nestjs/common';
import { Server } from 'socket.io';
import { RedisIoAdapter } from '../redis-io.adapter';
import { InternalConfigService } from '../../config/internal-config.service';

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

    expect(server).toBeInstanceOf(Server);
    expect(server.adapter()).toBeDefined();
  });
});
