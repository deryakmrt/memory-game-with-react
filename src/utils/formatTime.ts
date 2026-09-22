function formatTime(seconds: number) : string{
    const minutes = Math.floor(seconds/60)
    .toString()
    .padStart(2, '0')

    const remainingSeconds = (seconds%60)
    .toString()
    .padStart(2, '0')

    return `${minutes}:${remainingSeconds}`
}
export default formatTime

/* 
formatTime(0)   // '00:00'
formatTime(5)   // '00:05'
formatTime(65)  // '01:05' 
*/