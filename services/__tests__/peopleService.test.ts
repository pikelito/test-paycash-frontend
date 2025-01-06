import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPeople } from '../peopleService';
import { Person } from '@/types/people';

const API_URL = 'http://localhost:8000/api';

const mockPeopleData: { data: Person[] } = {
  data: [
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
  ],
};

global.fetch = vi.fn();

describe('peopleService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch people successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPeopleData,
    });

    const result = await getPeople();

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/people`);
    expect(result).toEqual(mockPeopleData.data);
  });

  it('should throw an error when the fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(getPeople()).rejects.toThrow(
      'Error fetching people: 500 Internal Server Error'
    );
  });
});
