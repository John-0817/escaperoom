import { useTimer } from './TimerContext';

export default function RenderTimer() {
  const { time, formatTime } = useTimer();

  return(
    <div className='flex w-[50px] h-[30px] bg-gray-100 border items-center justify-center'>
      <p>{formatTime(time)}</p>
    </div>
  )
}