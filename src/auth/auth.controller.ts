import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async companyLogin(@Body() loginDto: LoginDto, @Res() res: Response) {
    return await this.authService.login(loginDto, res);
  }
}
