// user.entity.ts
import { Role, User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  static prismaSelect() {
    return {
      id: true,
      email: true,
      name: true,
      role: true,
    };
  }
}
