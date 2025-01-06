import { useState, useCallback } from 'react';
import { Person, UsePeopleReturn } from '@/types/people';
import { getPeople, createPerson } from '../services/peopleService';

export const usePeople = (): UsePeopleReturn => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPeople();
      setPeople(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar las personas'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPerson = useCallback(
    async (person: Omit<Person, 'id'>) => {
      try {
        setIsLoading(true);
        setError(null);
        await createPerson(person);
        await fetchPeople();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al crear la persona'
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPeople]
  );

  return {
    people,
    isLoading,
    error,
    fetchPeople,
    addPerson,
  };
};
