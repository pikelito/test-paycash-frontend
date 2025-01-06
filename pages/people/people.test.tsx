import React from 'react';
import { render, screen, RenderOptions } from '@testing-library/react';
import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import People from './index';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

beforeAll(() => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
});

vi.mock('../../context/people/PeopleContext', () => ({
  usePeopleContext: () => ({
    people: [],
    setPeople: vi.fn(),
    isModalOpen: false,
    setIsModalOpen: vi.fn(),
    modalType: null as 'add' | 'edit' | 'delete' | null,
    setModalType: vi.fn(),
    selectedPerson: null,
    setSelectedPerson: vi.fn(),
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
