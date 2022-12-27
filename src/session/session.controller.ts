import { Controller, Get, Post, Body, Param, Put, Req } from '@nestjs/common';
import { CreateSessionDto } from './dtos/create.dto';
import { FindOneSessionParams } from './dtos/find.dto';
import { UpdateSessionDto } from './dtos/update.dto';
import { SessionDto } from './dtos/session.dto';
import { SessionService } from './session.service';

@Controller('api/v1/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get(':id')
  async get(@Param() findOneSession: FindOneSessionParams) {
    const Session = await this.sessionService.getSessionById(findOneSession.id);
    return new SessionDto(Session);
  }

  @Get('/user/:id')
  async getSessions(@Param() findOneSession: FindOneSessionParams) {
    const Sessions = await this.sessionService.getSessions({
      user: findOneSession.id,
    });
    return Sessions.map((Session) => new SessionDto(Session));
  }

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    const session = await this.sessionService.createSession(createSessionDto);

    const sessionDTO = new SessionDto(session);

    return {
      session: sessionDTO,
    };
  }

  @Put(':id')
  async update(
    @Param() findOneSession: FindOneSessionParams,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    const Session = await this.sessionService.updateSession(
      findOneSession.id,
      updateSessionDto,
    );
    return new SessionDto(Session);
  }
}
