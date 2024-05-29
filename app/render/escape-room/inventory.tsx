import Image from 'next/image';
import clsx from 'clsx';

export default function RenderInventory(props: RenderInventoryProps) {
  const {inventory, itemOnHand, selectItem} = props
  function handleClick() {
    console.log('item selected')
  }

  return(
    <div className='flow self-center justify-items-center w-[100px] h-[700px] border bg-gray-100 p-2'>
      <p className='font-semibold text-center'>Inventory</p>
      <div className='mt-2 grid grid-rows-10'>
        {inventory.map((item, index) => (
          <div 
            key={index} 
            className={
              clsx(
                'flex items-center justify-center w-[80px] h-[80px] bg-white border',
                {
                  'border-2 border-blue-400 opacity-80': item && itemOnHand === item.name
                },
              )
            }
          >
            {item && item.src ? (
              <button onClick={() => selectItem(item.name ? item.name : '')}>
                <Image 
                  src={item.src}
                  width={44}
                  height={44}
                  alt=''
                />
              </button>
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}