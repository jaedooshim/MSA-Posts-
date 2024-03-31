import {
  ArgumentsHost,
  Catch,
  HttpException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionFilter implements RpcExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // return {
    //   message: exception.message,
    //   status,
    //   data: null,
    // };
    return throwError(() => exception);
  }
}
