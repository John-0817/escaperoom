'use client'

import { useRef } from 'react';
import { useModal } from './ModalContext';
import { useInventory } from '../game-room/inventory/InventoryContext';
import { conditionChecker, updateItem } from '@/app/helper/gameHelper';
import { useTimer } from '../game-room/timer/TimerContext';

// Render Game Start Message Modal
export function GameStartModal() {
  const { startTimer } = useTimer();
  const { closeModal }= useModal();

  const handleButtonClick = () => {
    startTimer();
    closeModal();
  }

  return (
    <div className='flex flex-col items-center'>
      <p>Welcome to the escape room! Press start to begin the game.</p>
      <button
        onClick={handleButtonClick}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        Start
      </button>
    </div>
  )
}

// Render Game Complete Message Modal
export function GameCompleteModal () {
  const { time } = useTimer();
  const { closeModal }= useModal();

  const CompleteTime = 300 - time;
  const minutes = Math.floor(CompleteTime / 60);
  const seconds = CompleteTime % 60;

  return(
    <div className='flex flex-col items-center'>
      <p>You have successfully escaped from the room in {minutes} minutes and {seconds < 10 ? '0' : ''}{seconds} seconds.</p>
      <button
        onClick={closeModal}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        Complete
      </button>
    </div>
  )
}

// Render Fake Item Modal
export function FakeItemModal ({ item }: { item: FakeItem }) {
  const { closeModal } = useModal();
  const content = item.description;

  return (
    <div className='flex flex-col items-center'>
      {content}
      <button
        onClick={closeModal}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        Okay
      </button>
    </div>
  )
}

// Render Real Item Modal - Quiz
export function QuizModal ({ item, isLast, setGameComplete, setRealItems, setPrerequisiteItems }: QuizModalProps) {
  const { closeModal } = useModal();
  const userAnswer = useRef<HTMLInputElement>(null);

  const isCorrect = item.isCorrect;
  const content = isCorrect? item.completionMessage : item.hint;

  const handleButtonClick = () => {
    const input = userAnswer.current && userAnswer.current.value;
    const isMatch = conditionChecker(input, item.answer);

    if (isMatch) {
      updateItem(setRealItems, item.id, { isCorrect: true });

      if (item.unlockedPrerequisite !== null) {
        updateItem(setPrerequisiteItems, item.unlockedPrerequisite, { isVisible: true });
      }
      
      if (!isLast) {
        updateItem(setRealItems, item.id + 1, { isVisible: true });
      } else {
        setGameComplete(true);
      }
    }

    closeModal();
  };

  return(
    <div className='flex flex-col items-center'>
      {content}
      {!isCorrect ? <input className='mt-2 pl-2 bg-gray-100 rounded border font-normal' ref={userAnswer}/> : null}
      <button
        onClick={handleButtonClick}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        {!isCorrect ? 'Check': 'Okay'} 
      </button>
    </div>
  )
}

// Render Real Item Modal - Click
export function ClickModal ({ item, isLast, setGameComplete, setRealItems, setPrerequisiteItems }: ClickModalProps) {
  const { closeModal } = useModal();

  const isCorrect = item.isCorrect;
  const content = isCorrect? item.completionMessage : item.hint;

  const handleButtonClick = () => {
    updateItem(setRealItems, item.id, { isCorrect: true });
    
    if (item.unlockedPrerequisite !== null) {
      updateItem(setPrerequisiteItems, item.unlockedPrerequisite, { isVisible: true });
    }

    if (!isLast) {
      updateItem(setRealItems, item.id + 1, { isVisible: true });
    } else {
      setGameComplete(true);
    }

    closeModal();
  };

  return(
    <div className='flex flex-col items-center'>
      {content}
      <button
        onClick={handleButtonClick}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        Okay
      </button>
    </div>
  )
}

// Render Real Item Modal - Prerequisite
export function PrerequisiteModal ({ item, isLast, setGameComplete, setRealItems, setPrerequisiteItems }: PrerequisiteModalProps) {
  const { closeModal } = useModal();
  const { itemOnHand, removeItemFromInventory } = useInventory();

  const isMatch = conditionChecker(itemOnHand, item.prerequisiteItem);
  const isCorrect = item.isCorrect;
  const content = isMatch ? item.completionMessage : (isCorrect ? item.completionMessage : item.hint);

  const handleButtonClick = () => {
    if (isMatch) {
      updateItem(setRealItems, item.id, { isCorrect: true });

      if (item.unlockedPrerequisite !== null) {
        updateItem(setPrerequisiteItems, item.unlockedPrerequisite, { isVisible: true });
      }

      if (!isLast) {
        updateItem(setRealItems, item.id + 1, { isVisible: true });
      } else {
        setGameComplete(true);
      }

      removeItemFromInventory(itemOnHand);
    }

    closeModal();
  };

  return(
    <div className='flex flex-col items-center'>
      {content}
      <button
        onClick={handleButtonClick}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        Okay
      </button>
    </div>
  )
}

// Render Prerequisite Item Modal
export function PrerequisiteItemModal ({ item, setPrerequisiteItems }: PrerequisiteItemProps) {
  const { closeModal } = useModal();
  const { addToInventory } = useInventory();

  const content = item.hint;

  const handleButtonClick = () => {
    updateItem(setPrerequisiteItems, item.id, { inInventory: true });
    updateItem(setPrerequisiteItems, item.id, { isVisible: false });

    addToInventory({ src: item.src, name: item.name });

    closeModal();
  }

  return(
    <div className='flex flex-col items-center'>
      {content}
      <button
        onClick={handleButtonClick}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        Okay
      </button>
    </div>
  )
}

