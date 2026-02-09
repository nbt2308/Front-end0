import { useEffect, useState } from "react"

const CountDownTimer = (props) => {
    const { onTimeUp,check } = props
    const [count, setCount] = useState(3000)
    
    
    useEffect(() => {
        if(check.onTimeUp===true){
            setCount(0);
            return;
        }
        if (count === 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000)

        return () => {
            clearInterval(timer);
        }
    }, [count])
    //func count down
    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    return (
        <>
            <div className="countDown-container">
                {toHHMMSS(count)}
            </div>
        </>
    )
}
export default CountDownTimer