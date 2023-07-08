import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CompanyLoginDto } from './dto/login-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('/signup')
  async companySignup(
    @Body() createCompanyDto: CreateCompanyDto,
    @Res() res: Response,
  ) {
    return await this.companyService.companySignup(createCompanyDto, res);
  }

  @Post('/login')
  async companyLogin(
    @Body() companyLoginDto: CompanyLoginDto,
    @Res() res: Response,
  ) {
    return await this.companyService.companyLogin(companyLoginDto, res);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.companyService.findAll(req, res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
