import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesService {
  constructor(private prismaService: PrismaService) {}

  async getJobSpecificCandidates(jobId: number) {
    try {
      const result = await this.prismaService.candidates.findMany({
        where: {
          job_post_id: jobId,
        },
        orderBy: {
          rank: 'asc', // Sort candidates by rank in ascending order
        },
      });

      return result;
    } catch (error) {
      throw new Error('Failed to get job specific candidates');
    }
  }
}
