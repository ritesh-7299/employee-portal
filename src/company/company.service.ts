import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './entities/company.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CompanyLoginDto } from './dto/login-company.dto';
import { Role } from 'src/auth/guards/roles';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
    private readonly jwtService: JwtService,
  ) {}

  //Api for company signup
  async companySignup(createCompanyDto: CreateCompanyDto, res: Response) {
    try {
      const { name, email, password } = createCompanyDto;

      const isCompanyExist = await this.companyModel
        .find({ email: email }, { _id: 1 })
        .lean();

      if (isCompanyExist.length) {
        return res.json({
          status: false,
          message: 'You are already registered with this email.',
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const companyData = await this.companyModel.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({
        id: companyData._id,
        role: 'company',
      });

      return res.json({
        status: true,
        token: token,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Something went wrong!',
      });
    }
  }

  //Api for company login
  async companyLogin(companyLoginDto: CompanyLoginDto, res: Response) {
    try {
      const { email, password, role } = companyLoginDto;
      let data = undefined;

      if (role === Role.COMPANY) {
        data = await this.companyModel.findOne(
          { email: email },
          { _id: 1, password: 1 },
        );
      }

      if (!data) {
        return res.json({
          status: false,
          message: 'Incorrect email',
        });
      }

      const isPassMatch = await bcrypt.compare(password, data.password);

      if (!isPassMatch) {
        return res.json({
          status: false,
          message: 'Incorrect password',
        });
      }

      const token = this.jwtService.sign({
        id: data._id,
        role: role,
      });

      return res.json({
        status: true,
        token: token,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Something went wrong!',
      });
    }
  }

  findAll(req: Request, res: Response) {
    return res.json({
      success: true,
      userData: req['user'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
