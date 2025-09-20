// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { HttpModule } from '@nestjs/axios';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     HttpModule,
//     JwtModule.register({
//       secret: process.env.SECRET_TOKEN,
//       signOptions: { expiresIn: '30d' },
//     }),
//   ],
//   providers: [AuthService],
//   exports: [AuthService],
// })
// export class AuthModule {}



import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_TOKEN'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
