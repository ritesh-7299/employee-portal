import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/auth/guards/roles';
import { Company, CompanyDocument } from 'src/company/entities/company.entity';
import { EmployeeLoginDto } from './dto/employee-login.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async signup(createEmployeeDto: CreateEmployeeDto, res: any) {
    try {
      const { name, email, password, company_id } = createEmployeeDto;
      const employee = await this.employeeModel.findOne({ email });

      if (employee) {
        return res.json({
          status: false,
          message: 'Employee is already exist with this name',
        });
      }
      const company = await this.companyModel
        .findById(company_id, { _id: 1 })
        .lean();

      if (!company) {
        return res.json({
          status: false,
          message: 'Invalid Company',
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const newEmployee = await this.employeeModel.create({
        name,
        email,
        company_id,
        password: hashedPassword,
      });

      const token = this.jwtService.sign({
        id: newEmployee._id,
        role: Role.EMPLOYEE,
      });

      return res.json({
        status: true,
        token: token,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: false,
        message: 'Something went wrong!',
      });
    }
  }

  //Api for employee login
  async login(employeeLoginDto: EmployeeLoginDto, res: any) {
    try {
      const { email, password, role } = employeeLoginDto;
      let data = undefined;

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

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
