// openai.module.ts
import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Module({
  providers: [OpenaiService],
  exports: [OpenaiService], // Export the service so other modules can use it
})
export class OpenaiModule {}
