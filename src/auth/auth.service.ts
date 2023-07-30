import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Role } from './guards/roles';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from 'src/company/entities/company.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
    private readonly jwtService: JwtService,
  ) {}

  //Api for company login
  async login(LoginDto: LoginDto, res: any) {
    try {
      const { email, password, role } = LoginDto;
      let data = undefined;

      if (role === Role.COMPANY) {
        data = await this.companyModel.findOne(
          { email: email },
          { _id: 1, password: 1 },
        );
      }
      if (role === Role.EMPLOYEE) {
        data = await this.employeeModel.findOne(
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
}
