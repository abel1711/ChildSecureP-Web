// dto/paginated-result.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResult<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty()
  count: number;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  totalPages?: number;

  constructor(data: T[], count: number, page?: number, limit?: number) {
    this.data = data;
    this.count = count;
    if (page) this.page = page;
    if (limit) this.limit = limit;
    if (page && limit) this.totalPages = Math.ceil(count / limit);
  }
}
