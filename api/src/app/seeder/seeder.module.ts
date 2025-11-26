import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SeederService],
  imports: [UserModule]
})
export class SeederModule {}
