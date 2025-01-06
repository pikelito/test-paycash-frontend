import React, { createContext, useContext, useState } from 'react';
import { Person, PeopleContextType, ModalType } from '@/types/people';

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        isModalOpen,
        setIsModalOpen,
        modalType,
        setModalType,
        selectedPerson,
        setSelectedPerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = () => {
  const context = useContext(PeopleContext);
  if (context === undefined) {
    throw new Error('usePeopleContext must be used within a PeopleProvider');
  }
  return context;
};
