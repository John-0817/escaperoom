export default function RenderModal(props: RenderModalProps) {
  const {isModalVisible, modalContent, closeModal} = props

  return(
    <>
      {isModalVisible && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-2 rounded shadow-md'>
            <div className='flex justify-between leading-4'>
              <div/>
              <button 
                onClick={closeModal}
                className='w-[14px] h-[14px] bg-red-500 shadow'
              >
                <p className='text-[10px] font-medium'>X</p>
              </button>
            </div>
            <div className='px-2 pt-2 font-semibold'>
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}