import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from './roles';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from 'src/company/entities/company.entity';
import { Model } from 'mongoose';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/entities/employee.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

      if (!requiredRoles.includes(payload.role)) {
        return false;
      }

      let userData = undefined;
      if (payload.role === Role.COMPANY) {
        userData = await this.companyModel
          .findOne({ _id: payload.id }, { _id: 1, password: 0, __v: 0 })
          .lean();
      }

      if (payload.role === Role.EMPLOYEE) {
        userData = await this.employeeModel
          .findOne({ _id: payload.id }, { _id: 1, password: 0, __v: 0 })
          .lean();
      }

      req['user'] = userData;

      if (userData) {
        return true;
      }
      return false;
    } catch (error) {
      throw new UnauthorizedException('Token issue');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
