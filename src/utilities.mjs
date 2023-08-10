export function isoDate(date=Date.now()){
    return new Date().toISOString().split('T')[0]
}