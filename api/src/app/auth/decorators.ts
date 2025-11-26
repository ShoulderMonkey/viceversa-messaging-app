import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
   
    //console.log('currentUser: ',request.user);
    
    return request.user;
  }
);

export const CurrentCompany = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
   
    console.log('currentCompany: ',request.company);
    
    return request.company;
  }
);


export const Public = () => SetMetadata('isPublic', true);

