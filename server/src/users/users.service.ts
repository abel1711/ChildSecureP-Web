import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { PaginatedResult } from 'src/common/dto/pagination-result.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {

    const passwordHash = createUserDto.password; //aca deberia hashear la password.
    const role: Role = 'USER';
    const newUser = {
      email: createUserDto.email,
      name: createUserDto.name,
      role,
      passwordHash,
    }
    return this.prisma.user.create({ data: newUser, select: UserEntity.prismaSelect() });
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResult<UserEntity>> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: UserEntity.prismaSelect(),
      }),
      this.prisma.user.count(),
    ]);

    return new PaginatedResult(users, total, page, limit);
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: UserEntity.prismaSelect() });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto, select: UserEntity.prismaSelect() });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id }, select: UserEntity.prismaSelect() });
  }
}
