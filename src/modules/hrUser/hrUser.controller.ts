import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from 'src/guards/Auth.guard';
import { CreateHrUserDto, LoginHrUserDto } from './hrUser.dto';
import { HrUserService } from './hrUser.service';

@Controller('auth/hr-user')
export class HrUserController {
  constructor(private readonly hrUserService: HrUserService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createhrUser(@Body() payload: CreateHrUserDto) {
    return this.hrUserService.createHrUser(payload);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginHrUser(
    @Body() payload: LoginHrUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.hrUserService.loginHrUser(res, payload);
  }
}
