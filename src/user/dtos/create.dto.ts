import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

const socialIdKeys = ['googleId', 'outlookId', 'facebookId'];

function validateSocialId(socialKey: string) {
  return function validateSocial(user: CreateUserDto): boolean {
    let value = true;
    socialIdKeys.forEach((key) => {
      if (key !== socialKey) {
        if (user[key]) {
          value = false;
        }
      }
    });
    return value;
  };
}

export class CreateUserDto {
  @IsString()
  idToken: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;

  @ValidateIf(validateSocialId('googleId'))
  @IsNotEmpty()
  googleId?: string;

  @ValidateIf(validateSocialId('outlookId'))
  @IsNotEmpty()
  outlookId?: string;

  @ValidateIf(validateSocialId('facebookId'))
  @IsNotEmpty()
  facebookId?: string;
}
