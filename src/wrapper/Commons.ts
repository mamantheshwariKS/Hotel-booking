
import { Env } from '../environment/Env'
import moment from 'moment'
import { mongoUserCollection } from './MongoHelper'
var bcrypt = require('bcrypt')


class Commons {
    getDateTimeString = (): string => {
        let str = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })
        return `[${str}]`
    }

    escapeData(str: string): string {
        str = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        return str
    }

    async sendCiricalErrorMail(message: string | undefined) {
        if (!Env.isLocal) {
            const mailingListErrors = 'Error Occurs'
            console.log(mailingListErrors)
        } else {
            console.error('crash:', message);
        }
    }

    random<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }

    sleep = async (mili: number): Promise<void> => {
        await new Promise(f => setTimeout(f, mili));
    }

    showDateTime = (val: number, pattern: string) => {
        return moment.unix((val) / 1000).format(pattern) //  pattern like: "DD MMM, YYYY h:mm a"
    }

}
var commons = new Commons();
export default commons





