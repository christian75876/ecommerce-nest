import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let exceptionResponse = exception.getResponse();
    
    // Si es una BadRequestException con un formato de mensaje personalizado
    if (exception instanceof BadRequestException && typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      const { statusCode, message } = exceptionResponse as any;
      exceptionResponse = {
        statusCode: statusCode || status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: message || 'Bad Request',
      };
    } else if (exception instanceof HttpException) {
      // En caso de que el error no sea una BadRequestException
      exceptionResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: exceptionResponse['message'] || 'An unexpected error occurred',
      };
    }

    response
      .status(status)
      .json(exceptionResponse);
  }
}