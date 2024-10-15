import { Controller, Param, Post, Get } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('candidates')
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}

  @Get('list/:id')
  async getJobSpecificCandidates(@Param('id') id: string) {
    const result = await this.candidatesService.getJobSpecificCandidates(
      parseInt(id),
    );

    return result;
  }
}
