import { useModal } from './ModalContext';

export default function RenderModal() {
  const {isModalVisible, modalContent, closeModal} = useModal();

  if (!isModalVisible) {
    return null;
  }

  return(
    <>
      {isModalVisible && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <div className='bg-white p-2 rounded shadow-md'>
            <div className='px-2 pt-2 font-semibold'>
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}