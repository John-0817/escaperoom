'use client'

import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [time, setTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [sirenOn, setSirenOn] = useState(false);

  useEffect(() => {
    if (!isRunning || time <= 0) return;
    const timer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer)
  }, [isRunning, time]);

  useEffect(() => {
    if (time <= 10 && time > 0){
      setSirenOn(true);
    } else {
      setSirenOn(false);
    }
  }, [time]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const startTimer = () => {
    setIsRunning(true);
  }

  const timerSwitch = () => {
    setIsRunning(!isRunning)
  }
  
  return (
    <TimerContext.Provider value={{ time, sirenOn, formatTime, startTimer, timerSwitch }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer(): TimerContextProps {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }

  return context;
}