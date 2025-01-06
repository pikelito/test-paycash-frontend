import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PersonFormModal } from '../PersonFormModal';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { NextUIProvider } from '@nextui-org/react';

const mockPerson = {
  id: '1',
  first_name: 'Miguel',
  last_name: 'Mariño',
  email: 'miguel@example.com',
  phone: '1234567890',
  birthdate: '1990-01-01',
  address: 'Test Address',
};

const mockFetchPeople = vi.fn().mockResolvedValue([]);
const mockAddPerson = vi.fn().mockResolvedValue({});
const mockEditPerson = vi.fn().mockResolvedValue({});
const mockSetIsModalOpen = vi.fn();
const mockSetPeople = vi.fn();

const mockUsePeople = vi.fn().mockReturnValue({
  addPerson: mockAddPerson,
  editPerson: mockEditPerson,
  fetchPeople: mockFetchPeople,
  isLoading: false,
  people: [],
  getPersonById: vi.fn().mockResolvedValue(mockPerson),
});

let contextValue: {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalType: 'add' | 'edit';
  selectedPerson: typeof mockPerson | null;
  setPeople: (people: any[]) => void;
} = {
  isModalOpen: true,
  setIsModalOpen: mockSetIsModalOpen,
  modalType: 'add',
  selectedPerson: null,
  setPeople: mockSetPeople,
};

vi.mock('../../../hooks/usePeople', () => ({
  usePeople: () => mockUsePeople(),
}));

vi.mock('../../../context/people/PeopleContext', () => ({
  usePeopleContext: () => contextValue,
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

describe('PersonFormModal - Common Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    contextValue = {
      isModalOpen: true,
      setIsModalOpen: mockSetIsModalOpen,
      modalType: 'add',
      selectedPerson: null,
      setPeople: mockSetPeople,
    };
  });

  it('closes modal when cancel button is clicked', async () => {
    render(<PersonFormModal />, { wrapper: AllTheProviders });

    const cancelButton = screen.getByText('Cancelar');
    await fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
      expect(mockFetchPeople).toHaveBeenCalled();
    });
  });
});

describe('PersonFormModal - Add Mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    contextValue = {
      isModalOpen: true,
      setIsModalOpen: mockSetIsModalOpen,
      modalType: 'add',
      selectedPerson: null,
      setPeople: mockSetPeople,
    };
  });

  it('submits form with correct data when adding', async () => {
    render(<PersonFormModal />, { wrapper: AllTheProviders });

    expect(screen.getByText('Agregar Persona')).toBeInTheDocument();

    const form = await screen.findByTestId('person-form');

    await fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { name: 'first_name', value: 'Jane' },
    });
    await fireEvent.change(screen.getByLabelText(/apellido/i), {
      target: { name: 'last_name', value: 'Smith' },
    });
    await fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: 'email', value: 'jane@example.com' },
    });
    await fireEvent.change(screen.getByLabelText(/teléfono/i), {
      target: { name: 'phone', value: '0987654321' },
    });
    await fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), {
      target: { name: 'birthdate', value: '1995-05-05' },
    });
    await fireEvent.change(screen.getByLabelText(/dirección/i), {
      target: { name: 'address', value: 'New Address' },
    });

    await fireEvent.submit(form);

    await waitFor(() => {
      expect(mockAddPerson).toHaveBeenCalledWith({
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        birthdate: '1995-05-05',
        address: 'New Address',
      });
    });

    expect(mockFetchPeople).toHaveBeenCalled();
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });
});

describe('PersonFormModal - Edit Mode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    contextValue = {
      isModalOpen: true,
      setIsModalOpen: mockSetIsModalOpen,
      modalType: 'edit',
      selectedPerson: mockPerson,
      setPeople: mockSetPeople,
    };
  });

  it('loads person data when editing', async () => {
    render(<PersonFormModal />, { wrapper: AllTheProviders });

    expect(screen.getByText('Editar Persona')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue('Miguel')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Mariño')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('miguel@example.com')
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1990-01-01')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Address')).toBeInTheDocument();
    });
  });

  it('submits form with correct data when editing', async () => {
    render(<PersonFormModal />, { wrapper: AllTheProviders });

    await waitFor(() => {
      expect(screen.getByDisplayValue('Miguel')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Mariño')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue('miguel@example.com')
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1990-01-01')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Address')).toBeInTheDocument();
    });

    await fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { name: 'first_name', value: 'Juan' },
    });

    const form = screen.getByTestId('person-form');
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(mockEditPerson).toHaveBeenCalledWith(mockPerson.id, {
        first_name: 'Juan',
        last_name: 'Mariño',
        email: 'miguel@example.com',
        phone: '1234567890',
        birthdate: '1990-01-01',
        address: 'Test Address',
      });
    });

    expect(mockFetchPeople).toHaveBeenCalled();
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });
});
