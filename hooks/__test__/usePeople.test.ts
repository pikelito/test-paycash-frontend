import { renderHook, act } from '@testing-library/react';
import { usePeople } from '../usePeople';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Person } from '@/types/people';

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
];

vi.mock('../../services/peopleService', () => ({
  getPeople: vi.fn(),
}));

describe('usePeople', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch people successfully', async () => {
    const { getPeople } = await import('../../services/peopleService');
    (getPeople as any).mockResolvedValueOnce(mockPeople);

    const { result } = renderHook(() => usePeople());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.people).toEqual([]);

    await act(async () => {
      await result.current.fetchPeople();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.people).toEqual(mockPeople);
  });

  it('should handle error when fetching people fails', async () => {
    const { getPeople } = await import('../../services/peopleService');
    (getPeople as any).mockRejectedValueOnce(new Error('Error de carga'));

    const { result } = renderHook(() => usePeople());

    await act(async () => {
      await result.current.fetchPeople();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Error de carga');
    expect(result.current.people).toEqual([]);
  });
});
