import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
export declare class AuthenticationGuard implements CanActivate {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
