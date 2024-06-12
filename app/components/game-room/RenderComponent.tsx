'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useModal } from '../modal/ModalContext';
import { ClickModal, FakeItemModal, GameCompleteModal, GameStartModal, PrerequisiteItemModal, PrerequisiteModal, QuizModal } from '../modal/ModalContent';
import { useTimer } from './timer/TimerContext';

export default function RenderComponent(props: RenderComponentProps) {
  const { fakeItems, initialRealItems, initialPrerequisiteItems } = props;
  const { showModal } = useModal();
  const { timerSwitch, sirenOn } = useTimer();

  const [realItems, setRealItems] = useState(initialRealItems);
  const [prerequisiteItems, setPrerequisiteItems] = useState(initialPrerequisiteItems);
  
  let visibleRealItems = realItems.filter(item => item.isVisible);
  let visiblePrerequisiteItems = prerequisiteItems.filter(item => item.isVisible);
  let allItems = [...fakeItems, ...visibleRealItems, ...visiblePrerequisiteItems];
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursor, setCursor] = useState('cursor-default');
  const [gameComplete, setGameComplete] = useState(false);

  const lastElement = realItems.length - 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const backgroundImage = new window.Image();
        backgroundImage.src = '/living-room.png';

        backgroundImage.onload = () => {
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

          drawItems(ctx, fakeItems);
          drawItems(ctx, visibleRealItems);
          drawItems(ctx, visiblePrerequisiteItems);
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        return () => {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mousedown', handleMouseDown);
        };
      }
    }
  }, [fakeItems, realItems, prerequisiteItems])

  useEffect(() => {
    showModal( <GameStartModal /> );
  }, [])

  useEffect(() => {
    if(gameComplete) {
      timerSwitch();
      setTimeout(() => {
        showModal(<GameCompleteModal />)
      }, 500)
    }
  }, [gameComplete])

  function drawItems(ctx: CanvasRenderingContext2D, items: FakeItem[] | RealItem[] | PrerequisiteItem[]) {
    items.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
      img.onload = () => {
        ctx.drawImage(img, item.dx, item.dy, item.width, item.height);
      };
    });
  }

  function handleMouseMove(event: MouseEvent) {
    const canvas = canvasRef.current;

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let cursor = 'cursor-default'
      for (const item of allItems) {
        if ( x >= item.dx && x <= item.dx + item.width && y >= item.dy && y <= item.dy + item.height ) {
          cursor = 'cursor-pointer'
          break;
        } 
      }

      setCursor(cursor);
    }
  }

  function handleMouseDown(event: MouseEvent) {
    const canvas = canvasRef.current;

    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      for (const item of allItems) {
        if ( x >= item.dx && x <= item.dx + item.width && y >= item.dy && y <= item.dy + item.height ) {
          handleItemClick(item);
          break;
        }
      }
    }
  }

  function handleItemClick(item: FakeItem | RealItem | PrerequisiteItem) {
    if ('type' in item) {
      const isLast = item.id === lastElement;
      switch (item.type) {
        case 'quiz': 
          showModal( <QuizModal item={item} isLast={isLast} setGameComplete={setGameComplete} setRealItems={setRealItems} setPrerequisiteItems={setPrerequisiteItems} /> );
          break;
        case 'click':
          showModal( <ClickModal item={item} isLast={isLast} setGameComplete={setGameComplete} setRealItems={setRealItems} setPrerequisiteItems={setPrerequisiteItems} /> );
          console.log('Real Item - Click');
          break;
        case 'prerequisite':
          showModal( <PrerequisiteModal item={item} isLast={isLast} setGameComplete={setGameComplete} setRealItems={setRealItems} setPrerequisiteItems={setPrerequisiteItems} /> );
          break;
      }
    } else if ('inInventory' in item) {
      showModal(<PrerequisiteItemModal item={item} setPrerequisiteItems={setPrerequisiteItems}/>);
    } else if ('description' in item) {
      showModal(<FakeItemModal item={item}/>);
    }
  }

  return (
  <div className='flex relative'>
    <canvas ref={canvasRef} width={700} height={700} className={`self-center border ${cursor}`} />
    <div className={`absolute top-0 left-0 w-full h-full ${sirenOn ? 'siren' : ''} pointer-events-none`} />
  </div>
  )
}