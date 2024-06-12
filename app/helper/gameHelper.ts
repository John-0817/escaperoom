import React from 'react';

type Item = RealItem | PrerequisiteItem;

export function updateItem<T extends Item> (
  setItems: React.Dispatch<React.SetStateAction<T[]>>, 
  id: number, 
  update: Partial<T>
) {
  setItems(prevItems => 
    prevItems.map(item => 
      item.id === id ? { ...item, ...update } : item
    )
  );
};

export function conditionChecker (providedValue: string | null, expectedValue: string) {
  return providedValue === expectedValue;
}
