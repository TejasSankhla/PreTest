import { IsNotEmpty, IsObject } from 'class-validator';

export class UpdateSlotsDto {
  @IsNotEmpty()
  @IsObject()
  updatedSlots: {
    0: Date[];
    1: Date[];
    2: Date[];
    3: Date[];
    4: Date[];
    5: Date[];
    6: Date[];
  };
}
