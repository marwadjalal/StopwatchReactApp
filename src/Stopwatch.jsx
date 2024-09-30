import React, {useState, useEffect, useRef} from 'react'

function Stopwatch(){
    
    const [isRunning, setIsRunning ] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const intervalId = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if(isRunning){
            intervalId.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10)
        }
        return() => {
            clearInterval(intervalId.current)
        }
    },[isRunning])

    function start(){
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime
    }
    function stop(){
        setIsRunning(false)
    }
    function reset(){
        setElapsedTime(0)
        setIsRunning(false)
    }
    function formatTime(){

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / 1000 % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10);
        //instead of counting from 1 to 999 milliseconds, we count from 0 to 99 milliseconds(+=10)

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }

    return(
        <>
            <h1 id="myH1">Stopwatch</h1>
            <div id="container">
                <div id="display">{formatTime()}</div>
                <div id="controls">
                    <button id="startBtn" onClick={start}>Start</button>
                    <button id="stopBtn" onClick={stop}>Stop</button>
                    <button id="resetBtn" onClick={reset}>Reset</button>
                </div>
           </div>
        </>
    )
}
export default Stopwatch