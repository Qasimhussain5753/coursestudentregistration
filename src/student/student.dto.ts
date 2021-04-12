import {
  IsNumber,
  IsEmail,
  IsString,
  Matches,
  IsOptional,
  ArrayUnique,
} from 'class-validator';

export class StudentDto {
  id: number;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  user_name: string;
  @IsEmail()
  email: string;

  @Matches(/[a-zA-Z0-9]{8,}/, {
    message: 'Password must be 8 letters',
  })
  @Matches(/(?:(?=.*\d))/, {
    message: 'Password must have atleast one digital number',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must have atleast one lower case letter',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must have atleast one Upper case letter',
  })
  @Matches(/(?=.*\W+)/, {
    message: 'Password must have atleast one special character',
  })
  password: string;
  @IsOptional()
  address: string;
  @IsString()
  phone: string;
  image: string;
  directory_path: string;
}
