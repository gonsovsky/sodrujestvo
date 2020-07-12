import {IUser} from "./user"

export class UserList{
    public page: number =0
    public per_page: number =0
    public total_pages: number=0
    public data: Array<IUser> = new Array<IUser>()

    constructor(json: any) {
        Object.assign(this, json)
    }
}

