import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type ListOfLogsData, LogType } from '../types';
import { EventEmitter } from 'events';

@Injectable()
export class LoggerService {
  private emitter: EventEmitter;
  public constructor(private readonly prisma: PrismaService) {
    this.emitter = new EventEmitter();
  }
  public async log(action: LogType, returned: unknown): Promise<void> {
    await this.prisma.logs.create({
      data: {
        action,
        returned: String(returned),
      },
    });
  }
  public async getAllLogs(): Promise<ListOfLogsData> {
    return await this.prisma.logs.findMany();
  }
}
