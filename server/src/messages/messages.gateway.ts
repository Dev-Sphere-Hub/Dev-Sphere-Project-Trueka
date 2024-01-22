import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io'

@WebSocketGateway(8001, { cors: '*' })
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server
  @SubscribeMessage('message')
  create(@MessageBody() message: CreateMessageDto) {
    this.messagesService.create(message);
    this.server.emit('message', message.message);
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: string) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('findOneMessageBiItemId')
  findOneByItemId(@MessageBody() id: string) {
    return this.messagesService.findOneByItemId(id);
  }

}
