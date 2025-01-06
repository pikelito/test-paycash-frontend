import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPeople, createPerson } from '../peopleService';
import { Person } from '@/types/people';

const API_URL = 'http://localhost:8000/api';

const mockPerson: Omit<Person, 'id'> = {
  first_name: 'Miguel',
  last_name: 'Mariño',
  email: 'miguel@example.com',
  phone: '1234567890',
  birthdate: '1990-01-01',
  address: 'Street 123',
};

const mockPeopleData = {
  data: [{ id: 1, ...mockPerson }],
};

global.fetch = vi.fn();

describe('peopleService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPeople', () => {
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

  describe('createPerson', () => {
    it('should create person successfully', async () => {
      const createdPerson = { id: 1, ...mockPerson };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdPerson,
      });

      const result = await createPerson(mockPerson);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockPerson),
      });
      expect(result).toEqual(createdPerson);
    });

    it('should throw an error when the creation fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      });

      await expect(createPerson(mockPerson)).rejects.toThrow(
        'Error creating person: 400 Bad Request'
      );
    });
  });
});
