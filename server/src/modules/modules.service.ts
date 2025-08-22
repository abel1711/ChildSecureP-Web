import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) { }

  findAll() {
    return this.prisma.modules.findMany();
  }
}
