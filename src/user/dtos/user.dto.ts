import { UserDocument } from '../user.schema';

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  googleId?: string;
  outlookId?: string;
  facebookId?: string;
  createdAt: string;
  updatedAt: string;

  constructor(user: UserDocument) {
    this.id = String(user._id);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.googleId = user.googleId;
    this.facebookId = user.facebookId;
    this.outlookId = user.outlookId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
