import { Person } from '@/types/people';

const API_URL = 'http://localhost:8000/api';

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
