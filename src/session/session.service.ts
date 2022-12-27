import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './session.schema';
import { CreateSessionDto } from './dtos/create.dto';
import { UpdateSessionDto } from './dtos/update.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async getSessionById(sessionId: string): Promise<SessionDocument> {
    return await this.sessionModel.findById(sessionId);
  }

  async getSession(attributes: {
    user?: string;
    trainer?: string;
    gym?: string;
  }): Promise<SessionDocument> {
    return await this.sessionModel.findOne(attributes);
  }

  async getSessions(attributes: {
    user?: string;
    trainer?: string;
    gym?: string;
  }): Promise<SessionDocument[]> {
    return await this.sessionModel.find(attributes);
  }

  async createSession(
    createSessionDto: CreateSessionDto,
  ): Promise<SessionDocument> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async updateSession(
    SessionId: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionDocument> {
    const existingSession = await this.sessionModel.findById(SessionId);
    if (existingSession._id) {
      await this.sessionModel.updateOne({ _id: SessionId }, updateSessionDto);
    }
    return await this.sessionModel.findById(SessionId);
  }
}
