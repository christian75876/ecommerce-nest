import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}
    
    canActivate(context: ExecutionContext): boolean {
        const requierdRoles = this.reflector.getAllAndOverride<number[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if(!requierdRoles){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        return requierdRoles.includes(user.roleId);
    }
}