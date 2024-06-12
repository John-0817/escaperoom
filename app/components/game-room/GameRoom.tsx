'use client'

import RenderComponent from './RenderComponent'
import RenderModal from '../modal/RenderModal';
import RenderInventory from './inventory/RenderInventory';
import { ModalProvider } from '../modal/ModalContext';
import { TimerProvider } from './timer/TimerContext';
import { InventoryProvider } from './inventory/InventoryContext';
import RenderTimer from './timer/RenderTimer';

export default function RenderMainPage(props: RenderMainPageProps) {
  const { fakeItems, realItems, prerequisiteItems } = props;
  
  return(
    <ModalProvider>
      <TimerProvider>
        <InventoryProvider>
          <div className='grow flex flex-col justify-center'>
            <RenderModal />
            <div className='flex flex-row justify-center'>
              <div className='flex flex-col'>
                <RenderTimer />
                <RenderComponent 
                  fakeItems={fakeItems} 
                  initialRealItems={realItems}
                  initialPrerequisiteItems={prerequisiteItems}
                />
              </div>
              <RenderInventory />
            </div>
          </div>
        </InventoryProvider>
      </TimerProvider>
    </ModalProvider>
  )
}