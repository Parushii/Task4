import React, { useEffect, useRef, useState } from 'react';
import './timer.css';

const Timer=()=>{

    const [seconds,setSeconds]=useState(4);
    const [minutes,setMinutes]=useState(0);

    var timer=useRef(null);
    let time=useRef(25);
    const update=()=>{
       
        timer.current=setInterval(()=>{
            if(minutes===0 && seconds===0 && time.current===5){
                clearInterval(timer.current);
                timer.current=null;
            }
            else if(minutes===0 && seconds===0 && time.current===25){
                setMinutes(0);
                setSeconds(2);
                time.current=5;
                //without useRef time ka value block scope?
            }
            
            else if(seconds===0){
                setMinutes(minutes-1);
                setSeconds(59);
            }
            else{
                setSeconds(seconds-1);
            }
            
        },1000)
    }
    useEffect(()=>{
        update();
        return()=>clearInterval(timer.current);
    })

    const reset=()=>{
        setSeconds(0);
        setMinutes(25);
        time.current=25;
    }
    const stop=()=>{
        clearInterval(timer.current);
    }
    const start=()=>{
        // setSeconds(seconds-1);
        // setMinutes(minutes);
        update();
    }
return(
<div className='timer' style={{backgroundColor:time.current===25? "#6ee56e":"#ff5353"}}>
<div className="container">
  <div className="timer-container">
    <h1 className='heading'>Pomodoro Timer</h1>
    <h2>{time.current===25?"work":"break"}</h2>
    <h1><span className='min'>{minutes<10?"0"+minutes:minutes}</span>:<span className='sec'>{seconds<10?"0"+seconds:seconds}</span></h1>
    <button className='reset' onClick={reset}>Reset</button>
    <button className='stop' onClick={stop}>Stop</button>
    <button className='start' onClick={start}>Start</button>
  </div>
</div>
</div>
    )
}
export default Timer