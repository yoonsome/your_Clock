const timer=document.querySelector(".timer"),
    timerClock=timer.querySelector(".timerClock"),
    btnP30S=timer.querySelector(".timer-p30s"),
    btnP1M=timer.querySelector(".timer-p1m"),
    btnP3M=timer.querySelector(".timer-p3m"),
    btnP5M=timer.querySelector(".timer-p5m"),
    btnM30S=timer.querySelector(".timer-m30s"),
    btnM1M=timer.querySelector(".timer-m1m"),
    btnStart=timer.querySelector(".timer-start"),
    btnRecord=timer.querySelector(".timer-record"),
    btnStop=timer.querySelector(".timer-stop"),
    btnReset=timer.querySelector(".timer-reset"),
    timerRecordList = timer.querySelector("ul");

const timeBtnList= [btnP30S,btnP1M,btnP3M,btnP5M,btnM30S,btnM1M]

const stopwatch=document.querySelector(".stopwatch"),
    stopwatchClock=stopwatch.querySelector(".stopwatchClock"),
    SWbtnStart=stopwatch.querySelector(".stopwatch-start"),
    SWbtnRecord=stopwatch.querySelector(".stopwatch-record"),
    SWbtnStop=stopwatch.querySelector(".stopwatch-stop"),
    SWbtnReset=stopwatch.querySelector(".stopwatch-reset"),
    SWRecordList=stopwatch.querySelector("ul");

function hide(btn){
    btn.classList.add("hide");
}

function show(btn){
    btn.classList.remove("hide");
}

function handleP30S(){
    let time = timerClock.innerText;
    if (time.split(":")[1] === "00"){
        time=time.replace(":00",":30")
        timerClock.innerText = time;
    }
    else{
        let min = time.split(":")[0];
        min = Number(min) + 1;
        timerClock.innerText=`${String(min).padStart(2,'0')}:00`;
    }
}

function handlePM(num){
    let time = timerClock.innerText;
    const sec = time.split(":")[1]
    let min = time.split(":")[0];
        min = Number(min) + num;
        timerClock.innerText=`${String(min).padStart(2,'0')}:${sec}`;
}

function handleM30S(){
    let time = timerClock.innerText,
        min = time.split(":")[0],
        sec = time.split(":")[1];
    if (time==="00:00"){
        alert("Error.");
        return;
    }
    if (sec==="00"){
        min = Number(min) - 1;
        timerClock.innerText=`${String(min).padStart(2,'0')}:30`;
    }else{
        timerClock.innerText=`${min}:00`;
    }
}

function handleM1M(){
    let time = timerClock.innerText,
        min = time.split(":")[0];
    const sec = time.split(":")[1];
    if (min === "00"){
        alert("Error.");
        return;
    }
    timerClock.innerText=`${String(Number(min)-1).padStart(2,'0')}:${sec}`
}

function calTime(){
    let time = timerClock.innerText,
        min = Number(time.split(":")[0]),
        sec = Number(time.split(":")[1]);
        
    if(min === 0 && sec === 0){
        alert("Time over.");
        clearInterval(nowTime);
        timeBtnList.forEach(show);
        btnStart.value = "start";
        show(btnStart);
        return;
    }
    if(sec !== 0){
        sec-=1;
    }
    else{
        min-=1;
        sec=59;
    }
    timerClock.innerText=`${String(Number(min)).padStart(2,'0')}:${
        String(Number(sec)).padStart(2,'0')}`;
}


function handleStart(){
    timeBtnList.forEach(hide);
    show(btnStop);
    show(btnRecord);
    nowTime = setInterval("calTime()",1000);
    hide(btnStart);
}

function handleStop(type){
    if (type ==="timer"){
        clearInterval(nowTime);
        hide(btnStop);
        show(btnStart);
        btnStart.value = "resume";
        timeBtnList.forEach(show);
    }
    
    else{
        hide(SWbtnStop);
        show(SWbtnStart);
        SWbtnStart.value = "resume";
        clearInterval(new_time);
    }
}

function handleRecord(type){
    const li=document.createElement("li");
    const span=document.createElement("span");
    
    li.appendChild(span);
    if(type==="timer"){
        span.innerText=timerClock.innerText;
        timerRecordList.appendChild(li);
    }else{
        span.innerText=stopwatchClock.innerText;
        SWRecordList.appendChild(li);
    }
}

function handleReset(type){
    if (type ==="timer"){
        timerClock.innerText ="00:00";
        clearInterval(nowTime);
        while(timerRecordList.firstChild){
            timerRecordList.removeChild(timerRecordList.firstChild);
        }
        timeBtnList.forEach(show);
        show(btnStart);
        btnStart.value="start";
        hide(btnStop);
        hide(btnRecord);
    }
    else{
        stopwatchClock.innerText="00:00";
        clearInterval(new_time);
        while(SWRecordList.firstChild){
            SWRecordList.removeChild(SWRecordList.firstChild);
        }
        show(SWbtnStart);
        SWbtnStart.value="start";
        hide(SWbtnStop);
        hide(SWbtnRecord);
    }
}

function SWcalTime(){
    let SWtime = stopwatchClock.innerText,
        min = Number(SWtime.split(":")[0]),
        sec = Number(SWtime.split(":")[1]);
    
    if (sec !==59){
        sec+=1;
    }
    else{
        sec = 0;
        min+=1;
    }
    stopwatchClock.innerText=`${String(Number(min)).padStart(2,'0')}:${
        String(Number(sec)).padStart(2,'0')}`;
}

function handleSWStart(){
    hide(SWbtnStart);
    show(SWbtnRecord);
    show(SWbtnStop);
    show(SWbtnReset);
    new_time = setInterval("SWcalTime()",1000);

}

function init(){
    btnP30S.addEventListener("click",handleP30S);
    btnP1M.addEventListener("click",(event)=>handlePM(1,event));
    btnP3M.addEventListener("click",(event)=>handlePM(3,event));
    btnP5M.addEventListener("click",(event)=>handlePM(5,event));
    btnM30S.addEventListener("click",handleM30S);
    btnM1M.addEventListener("click",handleM1M);
    btnStart.addEventListener("click",handleStart);
    btnStop.addEventListener("click",(event)=>handleStop("timer",event));
    btnRecord.addEventListener("click",(event)=>handleRecord("timer",event));
    btnReset.addEventListener("click",(event)=>handleReset("timer",event));

    SWbtnStart.addEventListener("click",handleSWStart);
    SWbtnStop.addEventListener("click",(event)=>handleStop("SW",event));
    SWbtnRecord.addEventListener("click",(event)=>handleRecord("SW",event));
    SWbtnReset.addEventListener("click",(event)=>handleReset("SW",event));
};

init();