import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body()
    dto: SignUpDto,
  ) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  async signIn(
    @Body()
    dto: SignInDto,
  ) {
    return this.authService.signIn(dto);
  }
}
