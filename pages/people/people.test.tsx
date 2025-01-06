import React from 'react';
import { render, screen, RenderOptions } from '@testing-library/react';
import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import People from './index';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { Person } from '@/types/people';

beforeAll(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

const mockPeople: Person[] = [
  {
    id: 1,
    first_name: 'Miguel',
    last_name: 'Mariño',
    email: 'miguel@example.com',
    phone: '1234567890',
    birthdate: '1990-01-01',
    address: 'Street 123',
  },
  {
    id: 2,
    first_name: 'Angelica',
    last_name: 'Garcia',
    email: 'angelica@example.com',
    phone: '0987654321',
    birthdate: '1995-05-05',
    address: 'Street 456',
  },
];

const mockSetModalType = vi.fn();
const mockSetSelectedPerson = vi.fn();

vi.mock('../../context/people/PeopleContext', () => ({
  usePeopleContext: () => ({
    people: mockPeople,
    setPeople: vi.fn(),
    isModalOpen: false,
    setIsModalOpen: vi.fn(),
    modalType: null as 'add' | 'edit' | 'delete' | null,
    setModalType: mockSetModalType,
    selectedPerson: null,
    setSelectedPerson: mockSetSelectedPerson,
  }),
}));

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

describe('People Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the page title', () => {
    customRender(<People />);
    expect(screen.getByText('Gestión de Personas')).toBeInTheDocument();
  });

  it('should render the table with the correct columns', () => {
    customRender(<People />);
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Apellido')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Teléfono')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('should render the add person button', () => {
    customRender(<People />);
    expect(screen.getByText('Agregar Persona')).toBeInTheDocument();
  });
});

describe('People Table', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render table rows with people data', () => {
    customRender(<People />);

    mockPeople.forEach((person) => {
      expect(screen.getByText(person.first_name)).toBeInTheDocument();
      expect(screen.getByText(person.last_name)).toBeInTheDocument();
      expect(screen.getByText(person.email)).toBeInTheDocument();
      expect(screen.getByText(person.phone)).toBeInTheDocument();
    });
  });

  it('should render edit and delete buttons for each row', () => {
    customRender(<People />);

    mockPeople.forEach(() => {
      const editButtons = screen.getAllByRole('button', { name: /editar/i });
      const deleteButtons = screen.getAllByRole('button', {
        name: /eliminar/i,
      });

      expect(editButtons).toHaveLength(mockPeople.length);
      expect(deleteButtons).toHaveLength(mockPeople.length);
    });
  });

  it('should call setModalType and setSelectedPerson when edit button is clicked', () => {
    customRender(<People />);
    const editButton = screen.getAllByRole('button', { name: /editar/i })[0];
    editButton.click();

    expect(mockSetModalType).toHaveBeenCalledWith('edit');
    expect(mockSetSelectedPerson).toHaveBeenCalledWith(mockPeople[0]);
  });
});
