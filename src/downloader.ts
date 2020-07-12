import {UserList} from "./model/userList";
import {IUser} from "./model/user";
const fetch = require("node-fetch");

export class Downloader{
    private contentUrl: string
    private frequency: number
    private callback:  (user: IUser) => void

    private currentPage: number=0
    private totalPages: number=0

    constructor(contentUrl: string, frequency: number, userDownloaded: (user: IUser) => void) {
        this.contentUrl = contentUrl
        this.frequency = frequency
        this.callback = userDownloaded
    }

    get urlPage(): string {
        return this.contentUrl + this.currentPage.toString()
    }

    async serve() {
        while (true) {
            this.currentPage = 1;
            this.totalPages = 0;
            this.servePage()
            await this.sleep(this.frequency)
        }
    }

    async servePage(){
        var cx = new UserList(await this.http<UserList>(this.urlPage));
        for (let entry of cx.data)
            this.callback(entry)
        if (this.totalPages==0)
            this.totalPages=cx.total_pages;
        if (this.currentPage < this.totalPages){
            this.currentPage += +1;
            this.servePage()
        }
    }

    async http<T>(
        request: RequestInfo
    ): Promise<T> {
        const response = await fetch(request)
        const body = await response.json()
        return body as T
    }

    sleep(s: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, s * 1000)
    });
    }
}