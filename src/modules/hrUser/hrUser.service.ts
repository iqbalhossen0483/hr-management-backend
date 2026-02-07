import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { StringValue } from 'ms';
import { HrUser } from 'src/entities/hrUser.entity';
import { AuthResponseType, JWTPayload, ResponseType } from 'src/type/common';
import { Repository } from 'typeorm';
import { CreateHrUserDto, LoginHrUserDto } from './hrUser.dto';

@Injectable()
export class HrUserService {
  constructor(
    @InjectRepository(HrUser)
    private readonly hrUserRepository: Repository<HrUser>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createHrUser(
    payload: CreateHrUserDto,
  ): Promise<ResponseType<Omit<HrUser, 'password_hash'>>> {
    const isExist = await this.hrUserRepository.findOne({
      where: { email: payload.email },
    });

    if (isExist) {
      throw new ConflictException('HR user with this email already exists');
    }
    const hasPassword = bcrypt.hashSync(payload.password, 10);

    const hrUser = this.hrUserRepository.create(payload);

    hrUser.password_hash = hasPassword;

    const user = await this.hrUserRepository.save(hrUser);
    const { password_hash: _, ...result } = user;

    return {
      success: true,
      message: 'HR user created successfully',
      data: result,
    };
  }

  generateAccessToken(hrUser: HrUser): string {
    const payload = { sub: hrUser.id, email: hrUser.email };
    const accessTokenSecret = this.configService.get<string>('jwt.secret');
    const expiresIn =
      this.configService.get<StringValue>('jwt.expiresIn') || '1d';
    const token = this.jwtService.sign(payload, {
      expiresIn,
      secret: accessTokenSecret,
    });
    return token;
  }

  generateRefreshToken(hrUser: HrUser): string {
    const payload: JWTPayload = { sub: hrUser.id, email: hrUser.email };
    const refreshTokenSecret =
      this.configService.get<string>('jwt.refreshSecret');
    const expiresIn =
      this.configService.get<StringValue>('jwt.refreshExpiresIn') || '7d';
    const token = this.jwtService.sign(payload, {
      expiresIn,
      secret: refreshTokenSecret,
    });
    return token;
  }

  setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }

  async loginHrUser(
    res: Response,
    payload: LoginHrUserDto,
  ): Promise<AuthResponseType<Omit<HrUser, 'password_hash'>>> {
    const hrUser = await this.hrUserRepository.findOne({
      where: { email: payload.email },
    });

    if (!hrUser) {
      throw new ConflictException('Invalid credentials');
    }
    const isPasswordValid = bcrypt.compareSync(
      payload.password,
      hrUser.password_hash,
    );

    if (!isPasswordValid) {
      throw new ConflictException('Invalid credentials');
    }

    const { password_hash: _, ...result } = hrUser;

    const accessToken = this.generateAccessToken(hrUser);
    const refreshToken = this.generateRefreshToken(hrUser);

    this.setCookies(res, accessToken, refreshToken);

    return {
      success: true,
      message: 'HR user logged in successfully',
      data: result,
      accessToken,
      refreshToken,
    };
  }
}
