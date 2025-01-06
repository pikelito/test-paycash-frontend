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
