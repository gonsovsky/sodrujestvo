import {Downloader} from "./downloader"
import {Storage} from "./storage"
import {RestApi} from "./restApi"
import {IUser} from "./model/user"

let storage = new Storage("mongodb://localhost:27017/")

new RestApi(5000, storage)
    .serve()

new Downloader("https://reqres.in/api/users?page=", 15, UserDownloaded)
    .serve()

async function UserDownloaded(user: IUser) {
    storage.put(user)
}




