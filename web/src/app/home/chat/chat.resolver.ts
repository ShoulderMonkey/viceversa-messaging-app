import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { Message } from "@viceversa-messaging-app/api-interfaces"
import { AuthService } from "@viceversa-messaging-app/auth"
import { combineLatest, map } from "rxjs"
import { MessageService } from "../../services/message.service"

@Injectable({
    providedIn: 'root'
})
export class ChatResolverService implements Resolve<Message[]>{

    constructor(
        private service: MessageService,
        private authService: AuthService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const userId = route.paramMap.get('userId')
        const currentUserId = this.authService.getLoggedUser()?.id
        const $recipientMessages = this.service.findMany({recipientId: userId, senderId: currentUserId}, {limit: 100}).pipe(
            map((res: any) => res.data)
        )
        const $senderMessages = this.service.findMany({recipientId: currentUserId, senderId: userId}, {limit: 100}).pipe(
            map((res: any) => res.data)
        )

        return combineLatest([$recipientMessages, $senderMessages]).pipe(
            map(([recipientM, senderM]) => {
                return [...recipientM, ...senderM]
            })
        )
           
    }
}