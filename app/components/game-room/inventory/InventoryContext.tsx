'use client'

import React, {createContext, useContext, useState, ReactNode} from 'react';

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<(Partial<PrerequisiteItem> | null)[]>(Array(8).fill(null));
  const [itemOnHand, setItemOnHand] = useState('');

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
    setItemOnHand('');
  };

  const selectItem = (item: string) => {
    setItemOnHand(prevItem => (prevItem === item ? '' : item));
  };

  return (
    <InventoryContext.Provider value={{ inventory, itemOnHand, addToInventory, removeItemFromInventory, selectItem }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory(): InventoryContextProps {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within a InventoryProvider');
  }

  return context;
}