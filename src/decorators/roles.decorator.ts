import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enum/roles.enum';

export const SetRoles = (...roles: Roles[]) => SetMetadata('roles', roles);