import React, { useEffect, useRef } from 'react'
import { FakeItem, PrerequisiteItem, RealItem } from '../../ui/items'
import Image from 'next/image';
import { RenderQuizModal, RenderClickModal, RenderPrerequisiteModal } from '../../ui/modal-content';


interface PrerequisiteItem {
  id: number;
  name: string;
  src: string;
  dx: number;
  dy: number;
  width: number;
  height: number;
  description: string;
  isVisible: boolean;
  inInventory: boolean;
}

export default function RenderComponent(props: RenderComponentProps) {
  const {
    fakeItems,
    realItems,
    prerequisiteItems,
    showModal,
    closeModal,
    updateRealItem,
    updatePrerequisiteItem,
    itemOnHand,
    addToInventory,
    removeItemFromInventory,
  } = props;

  

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
          drawItems(ctx, realItems.filter(item => item.isVisible));
          drawItems(ctx, prerequisiteItems.filter(item => item.isVisible));
        }

      }
    }
  }, [fakeItems, realItems, prerequisiteItems])

  function drawItems(ctx:CanvasRenderingContext2D, items: FakeItem[] | RealItem[] | PrerequisiteItem[] ) {
    items.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
      img.onload = () => {
        ctx.drawImage(img, item.dx, item.dy, item.width, item.height);
      };
    });
  }








  return(
    <div className='flex'>
      <canvas ref={canvasRef} width={700} height={700} className='self-center border'/>
    </div>
  )

  // const userAnswer = useRef<HTMLInputElement>(null);

  // // Modal preview from fake items
  // const handleShowModalFake = (content: string) => {
  //   showModal(
  //     <div className='flex flex-col items-center'>
  //       {content}
  //       <button
  //         onClick={closeModal}
  //         className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
  //       >
  //         Okay
  //       </button>
  //     </div>
  //   )
  // };

  // // Modal preview from real items
  // const handleShowModalReal = (
  //   id: number,
  //   content: string,
  //   type: 'quiz' | 'click' | 'prerequisite',
  //   answer: string,
  //   isCorrect: boolean,
  //   prerequisiteName: string | null,
  //   realTarget: number | null,
  //   prerequisiteTarget: number | null,
  // ) => {
  //   const checkAnswer = () => {
  //     if (userAnswer.current && userAnswer.current.value === answer) {
  //       updateRealItem(id, { isCorrect: true });

  //       if (realTarget !== null) {
  //         updateRealItem(realTarget, { isVisible: true });
  //       };

  //       if (prerequisiteTarget !== null) {
  //         updatePrerequisiteItem(prerequisiteTarget, { isVisible: true });
  //       };
  //     };

  //     closeModal();
  //   };

  //   const checkPrerequisite = () => {
  //     if (itemOnHand === prerequisiteName) {
  //       updateRealItem(id, { isCorrect: true });

  //       if (realTarget !== null) {
  //         updateRealItem(realTarget, { isVisible: true });
  //       };

  //       if (prerequisiteTarget !== null) {
  //         updatePrerequisiteItem(prerequisiteTarget, { isVisible: true });
  //       };

  //       removeItemFromInventory(itemOnHand);
  //     };

  //     closeModal();
  //   }

  //   const showNextItem = () => {
  //     updateRealItem(id, { isCorrect: true });

  //     if (realTarget !== null) {
  //       updateRealItem(realTarget, { isVisible: true });
  //     };

  //     if (prerequisiteTarget !== null) {
  //       updatePrerequisiteItem(prerequisiteTarget, { isVisible: true });
  //     };

  //     closeModal();
  //   }

  //   return (
  //     <>
  //       {type === 'quiz' && (
  //         showModal(
  //           <RenderQuizModal
  //             content={content}
  //             isCorrect={isCorrect}
  //             userAnswer={userAnswer}
  //             checkAnswer={checkAnswer}
  //           />
  //         )
  //       )}
  //       {type === 'click' && (
  //         showModal(
  //           <RenderClickModal
  //             content={content}
  //             showNextItem={showNextItem}
  //           />
  //         )
  //       )}
  //       {type === 'prerequisite' && (
  //         showModal(
  //           <RenderPrerequisiteModal
  //             content={content}
  //             checkPrerequisite={checkPrerequisite}
  //           />
  //         )
  //       )}
  //     </>
  //   )
  // }

  // // Modal preview from prerequisite items
  // const handleShowModalPrerequisite = (
  //   id: number,
  //   name: string,
  //   scr: string,
  //   alt: string,
  //   content: string,
  // ) => {
  //   const prerequisiteItemSelect = () => {
  //     updatePrerequisiteItem(id, { inInventory: true });
  //     addToInventory({ name: name, scr: scr, alt: alt });

  //     closeModal();
  //   }
  //   console.log('1')
  //   return (
  //     showModal(
  //       <div className='flex flex-col items-center'>
  //         {content}
  //         <button
  //           onClick={prerequisiteItemSelect}
  //           className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
  //         >
  //           Okay
  //         </button>
  //       </div>
  //     )
  //   )
  // }

  // return (
  //   <div className='relative self-center w-[700px] h-[700px] border'>
  //     {/* Background */}
  //     <Image
  //       src={'/living-room.png'}
  //       layout='fill'
  //       objectFit='cover'
  //       alt='Background'
  //       priority
  //     />

  //     {/* Fake Items*/}
  //     {fakeItems.map((item, index) => (
  //       <div key={index} className={item.className}>
  //         <FakeItem
  //           src={item.src}
  //           width={item.width}
  //           height={item.height}
  //           alt={item.alt}
  //           handleShowModalFake={() => handleShowModalFake(item.description)}
  //         />
  //       </div>
  //     ))}

  //     {/* Real Items*/}
  //     {realItems.map((item, index) => {
  //       const description = (item.type === 'prerequisite' && itemOnHand === item.prerequisiteName) || item.isCorrect
  //       ? item.conditionalDescription
  //       : item.description;

  //       return (
  //         <div key={index} className={item.className}>
  //           {item.isVisible && (
  //             <RealItem
  //               src={item.scr}
  //               width={item.width}
  //               height={item.height}
  //               alt={item.alt}
  //               handleShowModalReal={() =>
  //                 handleShowModalReal(
  //                   item.id,
  //                   description,
  //                   item.type,
  //                   item.ans,
  //                   item.isCorrect,
  //                   item.prerequisiteName,
  //                   item.realTarget,
  //                   item.prerequisiteTarget,
  //                 )
  //               }
  //             />
  //           )}

  //         </div>
  //       );
  //     })}

  //     {/* Prerequisite Items */}
  //     {prerequisiteItems.map((item, index) => (
  //       <div key={index} className={item.className}>
  //         {!item.inInventory && item.isVisible && (
  //           <PrerequisiteItem
  //             src={item.scr}
  //             width={item.width}
  //             height={item.height}
  //             alt={item.alt}
  //             handleShowModalPrerequisite={() =>
  //               handleShowModalPrerequisite(
  //                 item.id,
  //                 item.name,
  //                 item.scr,
  //                 item.alt,
  //                 item.description,
  //               )
  //             }
  //           />
  //         )}
  //       </div>
  //     ))}

  //   </div>
  // )
}