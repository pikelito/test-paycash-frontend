import { Person } from '@/types/people';

const API_URL =
  'https://k6yxy5gbs5.execute-api.us-east-2.amazonaws.com/prod/api';

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(`${API_URL}/people`);

  if (!response.ok) {
    throw new Error(
      `Error fetching people: ${response.status} ${response.statusText}`
    );
  }

  const { data } = await response.json();
  return data;
};

export const getPerson = async (id: number): Promise<Person> => {
  const response = await fetch(`${API_URL}/people/${id}`);

  if (!response.ok) {
    throw new Error(
      `Error fetching person: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};

export const createPerson = async (
  person: Omit<Person, 'id'>
): Promise<Person> => {
  const response = await fetch(`${API_URL}/people`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });

  if (!response.ok) {
    throw new Error(
      `Error creating person: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const updatePerson = async (
  id: number,
  person: Omit<Person, 'id'>
): Promise<Person> => {
  const response = await fetch(`${API_URL}/people/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });

  if (!response.ok) {
    throw new Error(
      `Error updating person: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const deletePerson = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/people/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(
      `Error deleting person: ${response.status} ${response.statusText}`
    );
  }
};
