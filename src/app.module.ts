import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsModule } from './organizations/organizations.module';
import { ResearchersModule } from './researchers/researchers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_CONNECTION'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT') || 5433,
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + 'dist/**/*.entity(.ts,.js)'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    OrganizationsModule,
    ResearchersModule,
    PatientsModule,
    ResultsModule,
  ],
})
export class AppModule {}
