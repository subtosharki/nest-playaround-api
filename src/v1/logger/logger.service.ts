import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type ListOfLogsData, LogType } from '../types';
import { EventEmitter } from 'events';

@Injectable()
export class LoggerService extends EventEmitter {
  public constructor(private readonly prisma: PrismaService) {
    super();
    for (const logTypeKey in LogType) {
      this.addListener(logTypeKey, (returned: Record<string, unknown>) => {
        this.prisma.logs.create({
          data: {
            action: logTypeKey,
            returned: String(returned),
          },
        });
      });
    }
  }
  public async getAllLogs(): Promise<ListOfLogsData> {
    return await this.prisma.logs.findMany();
  }
}
