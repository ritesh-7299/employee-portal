import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from 'src/company/entities/company.entity';
import { Role } from './roles';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/entities/employee.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        status: false,
        message: 'token not found',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

      console.log('Payload: ', payload);
      let userData = null;
      if (payload.role === Role.COMPANY) {
        userData = await this.companyModel
          .find({ _id: payload.id }, { _id: 1, password: 0, __v: 0 })
          .lean();
      }

      request['user'] = userData;
    } catch (error) {
      throw new UnauthorizedException({
        status: false,
        message: 'Invalid token',
      });
    }

    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
