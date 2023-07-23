import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './entities/company.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/entities/employee.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    @InjectModel(Company.name) private companyModel: Model<Company>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    private readonly jwtService: JwtService,
  ) {}

  //Api for company signup
  async companySignup(createCompanyDto: CreateCompanyDto, res: Response) {
    try {
      const { name, email, password } = createCompanyDto;

      const isCompanyExist = await this.companyModel
        .find({ $and: [{ email: email }, { isDeleted: false }] }, { _id: 1 })
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

  //Api for users to get list of companies
  async userCompanyList(res: any) {
    try {
      const data = await this.companyModel.find({}, { name: 1 }).lean();

      if (!data) {
        return res.json({
          status: false,
          message: 'Data not found',
        });
      }

      return res.json({
        status: true,
        data: data,
      });
    } catch (error) {
      return res.json({
        status: false,
        message: 'Something went wrong.',
      });
    }
  }

  //Api to get all the employees for company
  async employeeList(res: any) {
    const company_id = this.request.user._id.toString();

    const data = await this.employeeModel
      .find(
        {
          $and: [
            { company_id: company_id },
            { isVerified: true },
            { isDeleted: false },
          ],
        },
        { password: 0, updatedAt: 0, __v: 0, company_id: 0 },
      )
      .lean();

    if (!data) {
      return res.json({
        status: false,
        message: 'Data not found',
      });
    }
    return res.json({
      status: true,
      data: data,
    });
  }

  //function to get all the employees for company
  async getRecentEmployees() {
    const company_id = this.request.user._id.toString();

    const data = await this.employeeModel
      .find(
        {
          $and: [{ company_id: company_id }, { isDeleted: false }],
        },
        { password: 0, updatedAt: 0, __v: 0, company_id: 0 },
      )
      .limit(5)
      .sort({ createdAt: -1 })
      .lean();

    return data;
  }

  //function to get total number the employees for company
  async getTotalEmployees() {
    const company_id = this.request.user._id.toString();

    const data = await this.employeeModel
      .find(
        {
          $and: [
            { company_id: company_id },
            { isVerified: true },
            { isDeleted: false },
          ],
        },
        { _id: 1 },
      )
      .count()
      .lean();

    return data;
  }

  //function to get graph data
  async getGraphData() {
    const company_id = this.request.user._id.toString();

    const data = await this.employeeModel.aggregate([
      {
        $match: {
          company_id: company_id,
          isVerified: true,
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ['$_id', 1] }, then: 'Jan' },
                { case: { $eq: ['$_id', 2] }, then: 'Feb' },
                { case: { $eq: ['$_id', 3] }, then: 'Mar' },
                { case: { $eq: ['$_id', 4] }, then: 'Apr' },
                { case: { $eq: ['$_id', 5] }, then: 'May' },
                { case: { $eq: ['$_id', 6] }, then: 'Jun' },
                { case: { $eq: ['$_id', 7] }, then: 'Jul' },
                { case: { $eq: ['$_id', 8] }, then: 'Aug' },
                { case: { $eq: ['$_id', 9] }, then: 'Sep' },
                { case: { $eq: ['$_id', 10] }, then: 'Oct' },
                { case: { $eq: ['$_id', 11] }, then: 'Nov' },
                { case: { $eq: ['$_id', 12] }, then: 'Dec' },
              ],
              default: 'Unknown',
            },
          },
          count: 1,
        },
      },
    ]);
    return data;
  }

  //Api to get dashboard data for company
  async getDashboardData(res: any) {
    const company_id = this.request.user._id.toString();
    let data = {};

    const recentEmployeeData = await this.getRecentEmployees();
    data['recentEmployeeData'] = recentEmployeeData;

    const employeeBoxData = await this.getTotalEmployees();
    data['employeeBoxData'] = employeeBoxData;

    const graphData = await this.getGraphData();
    data['graphData'] = graphData;

    return res.json({
      status: true,
      data: data,
    });
  }

  //Api to get pending employees for company
  async getPendingEmployees(res: any) {
    const company_id = this.request.user._id.toString();

    const data = await this.employeeModel
      .find(
        {
          $and: [
            { company_id: company_id },
            { isVerified: false },
            { isDeleted: false },
          ],
        },
        { password: 0, updatedAt: 0, __v: 0, company_id: 0 },
      )
      .lean();

    if (!data) {
      return res.json({
        status: false,
        message: 'Data not found',
      });
    }
    return res.json({
      status: true,
      data: data,
    });
  }

  //Api to approve pending employees for company
  async employeesVerification(body: any, res: any) {
    const isVerified =
      body.action === 'approve' ? true : body.action === 'block' ? false : null;

    const data = await this.employeeModel
      .findOneAndUpdate(
        { _id: body.id },
        { isVerified: isVerified },
        { password: 0, updatedAt: 0, __v: 0, company_id: 0 },
      )
      .lean();

    if (!data) {
      return res.json({
        status: false,
        message: 'Data not found',
      });
    }
    return res.json({
      status: true,
      message: 'Record updated!',
    });
  }

  //Api to delete employees for company
  async employeeDelete(body: any, res: any) {
    const data = await this.employeeModel
      .findOneAndUpdate(
        { _id: body.id },
        { isDeleted: true },
        { password: 0, updatedAt: 0, __v: 0, company_id: 0 },
      )
      .lean();

    if (!data) {
      return res.json({
        status: false,
        message: 'Data not found',
      });
    }
    return res.json({
      status: true,
      message: 'Record updated!',
    });
  }
}
