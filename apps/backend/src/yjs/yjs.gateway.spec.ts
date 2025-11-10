import { Test, TestingModule } from '@nestjs/testing';
import { YjsGateway } from './yjs.gateway';

describe('YjsGateway', () => {
  let gateway: YjsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YjsGateway],
    }).compile();

    gateway = module.get<YjsGateway>(YjsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
