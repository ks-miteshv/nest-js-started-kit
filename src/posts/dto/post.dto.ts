import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 *click here for validation decorator
 *https://github.com/typestack/class-validator#validation-decorators
 */

export class PostDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @MaxLength(255)
  slug: string;

  @IsNotEmpty()
  @MinLength(10)
  desciption: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
