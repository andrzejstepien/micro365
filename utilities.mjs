import { DateTime } from "luxon"
export function isoDate(date){
    if(date){
        return DateTime.fromISO(date).toISODate()
    }
    return DateTime.now().toISODate()
}

export function removeUrls(string) {
    return string.replace(/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g, '')
}

export function timestamp(){
    return Date.now()
}


//console.log(isoDate('2023-08-10T15:02:35.380Z'))