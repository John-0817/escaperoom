'use client'

import React, {createContext, useContext, useState, ReactNode} from 'react';

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, modalContent, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextProps {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}