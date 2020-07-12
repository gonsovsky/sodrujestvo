import User, { IUser }  from "./model/user"
import mongoose = require("mongoose")

export interface IStorage {
    search(request: string): any
}

export class Storage implements IStorage {
    private conStr: string;

    constructor(conStr: string) {
        this.conStr = conStr
        mongoose.connection.on('disconnected', this.connect);
        this.connect();
    }

    connect() {
        mongoose
            .connect(
                this.conStr, {useNewUrlParser: true}
            )
            .then(() => {
                return console.info(`Successfully connected to ${this.conStr}`)
            })
            .catch(error => {
                console.error('Error connecting to database: ', error)
            });
    };

    async put(user: IUser) {
        User.exists({ id: user.id })
            .then( (result: boolean) => {
                    if (!result) {
                        User.create(user)
                        console.log(user)
                    }
                }
            )
    }

    async search(request: string) {
        request = request.trim()
        if (request == "")
            return User.find()
        else {
            var r = new RegExp("^" + request, 'i')
            var o = [{first_name: r}, {last_name: r}]
            return User.find().or(o)
        }
    }
}