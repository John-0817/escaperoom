'use client'

import React, { useState } from 'react'
import RenderComponent from './component'
import RenderModal from './modal';
import RenderInventory from './inventory';

export default function RenderMainPage(props: RenderMainPageProps) {
  const { fakeItems, initialRealItems, initialPrerequisiteItems } = props;
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [realItems, setRealItems] = useState(initialRealItems);
  const [prerequisiteItems, setPrerequisiteItems] = useState(initialPrerequisiteItems);
  const [inventory, setInventory] = useState<(Partial<PrerequisiteItem> | null)[]>(Array(8).fill(null));
  const [itemOnHand, setItemOnHand] = useState('');
  
  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  const updateRealItem = (id: number, update: Partial<RealItem>) => {
    // setRealItems(prevItems => 
    //   prevItems.map(item => 
    //     item.id === id ? { ...item, ...update } : item
    //   )
    // );
  };

  const updatePrerequisiteItem = (id: number, update: Partial<PrerequisiteItem>) => {
    setPrerequisiteItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, ...update } : item
      )
    );
  };

  const selectItem = (item: string) => {
    setItemOnHand(item);
  };

  const addToInventory = (item: Partial<PrerequisiteItem>) => {
    setInventory(prevInventory => {
      const newInventory = [...prevInventory];
      const index = prevInventory.findIndex(inventoryItem => inventoryItem === null);
      if (index !== -1) {
        newInventory[index] = item;
      } else {
        console.warn('Inventory is full. Could not add item.');
      }
      return newInventory;
    });
  };

  const removeItemFromInventory = (name: string) => {
    setInventory(prevInventory => {
      const updatedInventory = prevInventory.filter(item => item === null || item.name !== name);
      updatedInventory.push(null);

      return updatedInventory;
    });
    console.log(inventory);
    setItemOnHand('');
  };
  
  return(
    <div className='grow flex flex-col justify-center'>
      <RenderModal 
        isModalVisible={isModalVisible}
        modalContent={modalContent}
        closeModal={closeModal}
      />
      <div className='grow flex flex-row justify-center'>
        <RenderComponent 
          fakeItems={fakeItems} 
          realItems={realItems}
          prerequisiteItems={prerequisiteItems}
          showModal={showModal} 
          closeModal={closeModal}
          updateRealItem={updateRealItem}
          updatePrerequisiteItem={updatePrerequisiteItem}
          itemOnHand={itemOnHand}
          addToInventory={addToInventory}
          removeItemFromInventory={removeItemFromInventory}
        />
        <RenderInventory 
          inventory={inventory}
          itemOnHand={itemOnHand}
          selectItem={selectItem}
        />
      </div>
    </div>
  )
}