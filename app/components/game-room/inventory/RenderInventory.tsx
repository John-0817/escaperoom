import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useInventory } from './InventoryContext';

export default React.memo(function RenderInventory() {
  const  {inventory, itemOnHand, selectItem } = useInventory();

  return(
    <div className='flow self-center justify-items-center w-[100px] h-[731px] border bg-gray-100 p-2'>
      <p className='font-semibold text-center'>Inventory</p>
      <div className='mt-2 grid grid-rows-10'>
        {inventory.map((item, index) => {
          const className = clsx(
            'flex items-center justify-center w-[80px] h-[80px] bg-white border',
              {
                'border-2 border-blue-400 opacity-80': item && itemOnHand === item.name
              }
          );

          return(
            <div key={index} className={className}>
              {item && item.src ? (
                <button onClick={() => selectItem(item.name || '')}>
                  <Image 
                    src={item.src}
                    width={44}
                    height={44}
                    alt={item.name || 'Empty Inventory'}
                  />
                </button>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});