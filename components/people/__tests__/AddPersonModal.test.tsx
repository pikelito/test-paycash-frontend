import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddPersonModal } from '../AddPersonModal';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { NextUIProvider } from '@nextui-org/react';

const mockFetchPeople = vi.fn().mockResolvedValue([]);
const mockAddPerson = vi.fn().mockResolvedValue({});
const mockSetIsModalOpen = vi.fn();
const mockSetPeople = vi.fn();

const mockUsePeople = vi.fn().mockReturnValue({
  addPerson: mockAddPerson,
  fetchPeople: mockFetchPeople,
  isLoading: false,
  people: [],
});

vi.mock('../../../hooks/usePeople', () => ({
  usePeople: () => mockUsePeople(),
}));

vi.mock('../../../context/people/PeopleContext', () => ({
  usePeopleContext: () => ({
    isModalOpen: true,
    setIsModalOpen: mockSetIsModalOpen,
    modalType: 'add',
    setPeople: mockSetPeople,
  }),
}));

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

describe('AddPersonModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePeople.mockReturnValue({
      addPerson: mockAddPerson,
      fetchPeople: mockFetchPeople,
      isLoading: false,
      people: [],
    });
  });

  it('submits form with correct data', async () => {
    render(<AddPersonModal />, { wrapper: AllTheProviders });

    await fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { name: 'first_name', value: 'Miguel' },
    });
    await fireEvent.change(screen.getByLabelText(/apellido/i), {
      target: { name: 'last_name', value: 'Mariño' },
    });
    await fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: 'email', value: 'miguel@example.com' },
    });
    await fireEvent.change(screen.getByLabelText(/teléfono/i), {
      target: { name: 'phone', value: '1234567890' },
    });
    await fireEvent.change(screen.getByLabelText(/fecha de nacimiento/i), {
      target: { name: 'birthdate', value: '1990-01-01' },
    });
    await fireEvent.change(screen.getByLabelText(/dirección/i), {
      target: { name: 'address', value: 'Street 123' },
    });

    const form = screen.getByTestId('add-person-form');
    await fireEvent.submit(form);

    await waitFor(() => {
      expect(mockAddPerson).toHaveBeenCalledWith({
        first_name: 'Miguel',
        last_name: 'Mariño',
        email: 'miguel@example.com',
        phone: '1234567890',
        birthdate: '1990-01-01',
        address: 'Street 123',
      });
    });

    expect(mockFetchPeople).toHaveBeenCalled();
    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });

  it('closes modal when cancel button is clicked', async () => {
    render(<AddPersonModal />, { wrapper: AllTheProviders });

    const cancelButton = screen.getByText('Cancelar');
    await fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
      expect(mockFetchPeople).toHaveBeenCalled();
    });
  });
});
