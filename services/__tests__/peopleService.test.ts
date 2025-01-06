import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} from '../peopleService';

const mockPerson = {
  id: 1,
  first_name: 'Miguel',
  last_name: 'Mariño',
  email: 'miguel@example.com',
  phone: '1234567890',
  birthdate: '1990-01-01',
  address: 'Test Address',
};

const mockPersonInput = {
  first_name: 'Miguel',
  last_name: 'Mariño',
  email: 'miguel@example.com',
  phone: '1234567890',
  birthdate: '1990-01-01',
  address: 'Test Address',
};

describe('peopleService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
  });

  describe('getPeople', () => {
    it('fetches people successfully', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: [mockPerson] }),
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      const result = await getPeople();

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/people'
      );
      expect(result).toEqual([mockPerson]);
    });

    it('throws error when fetch fails', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      await expect(getPeople()).rejects.toThrow(
        'Error fetching people: 500 Internal Server Error'
      );
    });
  });

  describe('getPerson', () => {
    it('fetches a single person successfully', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockPerson),
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      const result = await getPerson(1);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/people/1'
      );
      expect(result).toEqual(mockPerson);
    });

    it('throws error when fetch fails for single person', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      await expect(getPerson(1)).rejects.toThrow(
        'Error fetching person: 404 Not Found'
      );
    });
  });

  describe('createPerson', () => {
    it('creates a person successfully', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockPerson),
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      const result = await createPerson(mockPersonInput);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/people',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockPersonInput),
        }
      );
      expect(result).toEqual(mockPerson);
    });

    it('throws error when creation fails', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      await expect(createPerson(mockPersonInput)).rejects.toThrow(
        'Error creating person: 400 Bad Request'
      );
    });
  });

  describe('updatePerson', () => {
    it('updates a person successfully', async () => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockPerson),
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      const result = await updatePerson(1, mockPersonInput);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/people/1',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockPersonInput),
        }
      );
      expect(result).toEqual(mockPerson);
    });

    it('throws error when update fails', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      await expect(updatePerson(1, mockPersonInput)).rejects.toThrow(
        'Error updating person: 400 Bad Request'
      );
    });
  });

  describe('deletePerson', () => {
    it('deletes a person successfully', async () => {
      const mockResponse = { ok: true };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      await deletePerson(1);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/people/1',
        {
          method: 'DELETE',
        }
      );
    });

    it('throws error when deletion fails', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse);

      await expect(deletePerson(1)).rejects.toThrow(
        'Error deleting person: 404 Not Found'
      );
    });
  });

  describe('Network errors', () => {
    it('handles network errors for all methods', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(getPeople()).rejects.toThrow();
      await expect(getPerson(1)).rejects.toThrow();
      await expect(createPerson(mockPersonInput)).rejects.toThrow();
      await expect(updatePerson(1, mockPersonInput)).rejects.toThrow();
      await expect(deletePerson(1)).rejects.toThrow();
    });
  });
});
