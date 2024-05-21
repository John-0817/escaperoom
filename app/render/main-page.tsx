'use client'

import React, { useState } from 'react'
import RenderComponent from './component'
import RenderModal from './modal';

export default function RenderMainPage(props: RenderMainPageProps) {
  const { fakeItems, initialRealItems } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [realItems, setRealItems] = useState(initialRealItems);

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  const updateItem = (id: number, update: Partial<RealItem>) => {
    setRealItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, ...update } : item
      )
    );
  };
  
  return(
    <div className='grow flex flex-col justify-center'>
      <RenderModal 
        isModalVisible={isModalVisible}
        modalContent={modalContent}
        closeModal={closeModal}
      />
      <RenderComponent 
        fakeItems={fakeItems} 
        realItems={realItems} 
        showModal={showModal} 
        closeModal={closeModal}
        updateItem={updateItem}
      />
    </div>
  )
}