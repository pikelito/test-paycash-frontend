export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthdate: string;
  address: string;
}

export type ModalType = 'add' | 'edit' | 'delete' | null;

export interface PeopleContextType {
  people: Person[];
  setPeople: (people: Person[]) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
}

export interface UsePeopleReturn {
  people: Person[];
  isLoading: boolean;
  error: string | null;
  fetchPeople: () => Promise<void>;
  addPerson: (person: Omit<Person, 'id'>) => Promise<void>;
}
