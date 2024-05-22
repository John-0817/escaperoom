import Image from 'next/image'

export default function RenderInventory(props: RenderInventoryProps) {
  const {inventory} = props

  return(
    <div className='flow self-center justify-items-center w-[100px] h-[700px] border bg-gray-100 p-2'>
      <p className='font-semibold text-center'>Inventory</p>
      <div className='mt-2 grid grid-rows-10'>
        {inventory.map((item, index) => (
          <div key={index} className='flex items-center justify-center w-[80px] h-[80px] bg-white border'>
            {item && item.scr && item.alt ? (
              <Image 
                src={item.scr}
                width={44}
                height={44}
                alt={item.alt}
              />
            ) : (
              <div />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}