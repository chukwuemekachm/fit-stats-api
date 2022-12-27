import { User } from 'src/user/user.schema';
import { GymDocument } from '../gym.schema';

export class GymDto {
  id: string;
  name: string;
  address: string;
  description: string;
  owner: User;
  image_url?: string;
  outlookId?: string;
  facebookId?: string;
  createdAt: string;
  updatedAt: string;

  constructor(gym: GymDocument) {
    this.id = String(gym._id);
    this.name = gym.name;
    this.address = gym.address;
    this.description = gym.description;
    this.owner = gym.owner;
    this.image_url = gym.image_url;
    this.createdAt = gym.createdAt;
    this.updatedAt = gym.updatedAt;
  }
}
