import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { INestApplication } from '@nestjs/common';
import { createClient } from 'redis';
import { InternalConfigService } from '../config/internal-config.service';

export class RedisIoAdapter extends IoAdapter {
  protected redisAdapter;

  constructor(app: INestApplication) {
    super(app);

    const internalConfigService = app.get(InternalConfigService);

    const { host, port } = internalConfigService.getRedisConfig();

    const pubClient = createClient({
      socket: {
        host,
        port,
      },
    });

    const subClient = pubClient.duplicate();

    pubClient.connect();
    subClient.connect();

    this.redisAdapter = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);

    server.adapter(this.redisAdapter);

    return server;
  }
}
