import { ParseIntPipe } from '@nestjs/common';

export const ParseOptionalIntPipe = new ParseIntPipe({ optional: true });
