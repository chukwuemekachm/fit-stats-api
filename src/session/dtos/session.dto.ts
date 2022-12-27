import { User } from 'src/user/user.schema';
import { SessionDocument } from '../session.schema';
import { Gym } from 'src/gym/gym.schema';

export class SessionDto {
  id: string;
  notes: string;
  gym: Gym;
  user: User;
  trainer?: User;
  date?: string;
  time?: string;
  createdAt: string;
  updatedAt: string;

  constructor(session: SessionDocument) {
    this.id = String(session._id);
    this.notes = session.notes;
    this.gym = session.gym;
    this.user = session.user;
    this.trainer = session.trainer;
    this.date = session.date;
    this.time = session.time;
    this.createdAt = session.createdAt;
    this.updatedAt = session.updatedAt;
  }
}
