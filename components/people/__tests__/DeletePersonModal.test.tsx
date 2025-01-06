import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeletePersonModal } from '../DeletePersonModal';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { NextUIProvider } from '@nextui-org/react';

const mockFetchPeople = vi.fn().mockResolvedValue([]);
const mockDeletePerson = vi.fn().mockResolvedValue({});
const mockSetIsModalOpen = vi.fn();
const mockSetSelectedPerson = vi.fn();
const mockUsePeople = vi.fn().mockReturnValue({
  removePerson: mockDeletePerson,
  fetchPeople: mockFetchPeople,
  isLoading: false,
});

vi.mock('../../../hooks/usePeople', () => ({
  usePeople: () => mockUsePeople(),
}));

vi.mock('../../../context/people/PeopleContext', () => ({
  usePeopleContext: () => ({
    isModalOpen: true,
    setIsModalOpen: mockSetIsModalOpen,
    modalType: 'delete',
    selectedPerson: mockPerson,
    setSelectedPerson: mockSetSelectedPerson,
  }),
}));

const mockPerson = {
  id: 1,
  first_name: 'Miguel',
  last_name: 'Marino',
  email: 'miguel@example.com',
  phone: '1234567890',
  birthdate: '1990-01-01',
  address: 'Test Address',
};

describe('DeletePersonModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays confirmation message with person name', () => {
    render(<DeletePersonModal />, {
      wrapper: NextUIProvider,
    });

    expect(
      screen.getByText(/¿Está seguro que desea eliminar a Miguel Marino?/)
    ).toBeInTheDocument();
  });

  it('calls deletePerson when confirm button is clicked', async () => {
    render(<DeletePersonModal />, {
      wrapper: NextUIProvider,
    });

    const deleteButton = screen.getByText('Eliminar');
    await fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockDeletePerson).toHaveBeenCalledWith(mockPerson.id);
      expect(mockFetchPeople).toHaveBeenCalled();
      expect(mockSetSelectedPerson).toHaveBeenCalledWith(null);
      expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
    });
  });

  it('closes modal when cancel button is clicked', async () => {
    render(<DeletePersonModal />, {
      wrapper: NextUIProvider,
    });

    const cancelButton = screen.getByText('Cancelar');
    await fireEvent.click(cancelButton);

    expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
  });
});
