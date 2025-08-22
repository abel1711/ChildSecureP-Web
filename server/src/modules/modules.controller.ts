import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {

  }
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.modulesService.findAll();
  }

}
