import React, { useState, useEffect } from "react";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
let timeIntervalId;
export default function Timer({ gameOver, sendTime }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);

  useEffect(() => {
    if (time > 0 && gameOver) {
      setSTime(time);
      setTime(0);
    }
  }, [gameOver, time]);

  useEffect(() => {
    const incrementTime = () => {
      let newTime = time + 1;
      setTime(newTime);
    };
    timeIntervalId = setTimeout(() => {
      incrementTime();
    }, 1000);
    if (gameOver) {
      clearInterval(timeIntervalId);
    }
  }, [time, setTime, gameOver, sendTime]);

  return (
    <div style={{ color: "white", fontSize: 30 }}>
      <AccessAlarmIcon/>
      {gameOver ? sTime : time}
    </div>
  );
}
