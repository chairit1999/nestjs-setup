import { SetMetadata } from '@nestjs/common';

export const PUBLIC = 'IS_PUBLIC';
export const IsPublic = (isPublic = true) => SetMetadata(PUBLIC, isPublic);
