/*
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@WebSocketGateway(8001, { cors: '*' })
export class CommentsGateway {
  private readonly commentsService: CommentsService;
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() createCommentDto: CreateCommentDto): void {
    console.log(createCommentDto);
    this.commentsService.create(createCommentDto);
    this.server.emit('message', createCommentDto.message);
  }
}
*/