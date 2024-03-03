import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    CompanyModule,
    EmployeeModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
