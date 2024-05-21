import React, { useRef } from 'react'
import { FakeItem, RealItem } from '../ui/items'
import Image from 'next/image';

export default function RenderComponent(props: RenderComponentProps) {
  const { fakeItems, realItems, showModal, closeModal, updateItem } = props;
  const userAnswer = useRef<HTMLInputElement>(null);

  const handleShowModalFake = (content: string) => {
    showModal(
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
  };

  const handleShowModalReal = (id: number, content: string, type: 'quiz' | 'click' | 'prerequisite', answer: string, isCorrect: boolean) => {
    const checkAnswer = () => {
      if(userAnswer.current && userAnswer.current.value === answer) {
        updateItem(id, { isCorrect: true });

        const nextItem = realItems.find(item => item.id === id + 1);
        if (nextItem) {
          updateItem(id + 1, { isVisible: true });
        }
      };
  
      closeModal();
    };

    const showNextItem = () => {
      updateItem(id, { isCorrect: true });

      const nextItem = realItems.find(item => item.id === id + 1);
      if (nextItem) {
        updateItem(id + 1, { isVisible: true });
      }

      closeModal();
    }

    return (
      <>
      {type === 'quiz' && (
        showModal(
          <div className='flex flex-col items-center'>
            {content}
            {!isCorrect ? <input className='mt-2 pl-2 bg-gray-100 rounded border font-normal' ref={userAnswer}/> : null}
            <button
              onClick={checkAnswer}
              className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
            >
              {!isCorrect ? 'Check': 'Okay'} 
            </button>
          </div>
        )
      )}
      {type === 'click' && (
        showModal(
          <div className='flex flex-col items-center'>
            {content}
            <button
              onClick={showNextItem}
              className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
            >
              Okay
            </button>
          </div>
        )
      )}
      </>
    )
  }

  return ( 
    <div className='relative self-center w-[700px] h-[700px]'>
      {/* Background */}
      <Image 
        src={'/living-room.png'}
        layout='fill'
        objectFit='cover'
        alt='Background'
      />

      {/* Fake Item: Pillow */}
      <div className='absolute bottom-[240px] right-[190px]'>
        <FakeItem 
          src={fakeItems.pillow.src}
          width={fakeItems.pillow.width}
          height={fakeItems.pillow.height}
          alt={fakeItems.pillow.alt}
          handleShowModalFake={() => handleShowModalFake(fakeItems.pillow.description)}
        />
      </div>

      {/* Fake Item: Chef Knife */}
      <div className='absolute bottom-[285px] left-[40px]'>
        <FakeItem 
          src={fakeItems.chefKnife.src}
          width={fakeItems.chefKnife.width}
          height={fakeItems.chefKnife.height}
          alt={fakeItems.chefKnife.alt}
          handleShowModalFake={() => handleShowModalFake(fakeItems.chefKnife.description)}
        />
      </div>

      {/* Real Item: Blueberry */}
      <div className='absolute bottom-[60px] left-[160px]'>
        {realItems[0].isVisible && (
          <RealItem
            src={realItems[0].scr}
            width={realItems[0].width}
            height={realItems[0].height}
            alt={realItems[0].alt}
            handleShowModalReal={() =>
              handleShowModalReal(
                realItems[0].id,
                !realItems[0].isCorrect ? realItems[0].description : realItems[0].conditionalDescription,
                realItems[0].type,
                realItems[0].ans,
                realItems[0].isCorrect,
              )
            }
          />
        )}
      </div>

      {/* Real Item: Cherry */}
      <div className='absolute bottom-[120px] right-[150px]'>
        {realItems[1].isVisible && (
          <RealItem
            src={realItems[1].scr}
            width={realItems[1].width}
            height={realItems[1].height}
            alt={realItems[1].alt}
            handleShowModalReal={() =>
              handleShowModalReal(
                realItems[1].id,
                !realItems[1].isCorrect ? realItems[1].description : realItems[1].conditionalDescription,
                realItems[1].type,
                realItems[1].ans,
                realItems[1].isCorrect,
              )
            }
          />
        )}
      </div>

    </div>
  )
}