import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { User } from "@viceversa-messaging-app/api-interfaces"
import { map } from "rxjs"
import { UserService } from "../../services/user.service"

@Injectable({
    providedIn: 'root'
})
export class UserResolverService implements Resolve<User>{

    constructor(
        private service: UserService,
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipientId = route.paramMap.get('userId')
        return this.service.findMany({id: recipientId}, {limit: 1}).pipe(
            map((res: any) => res.data[0])
        )
    }
}