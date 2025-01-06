import { useState, useCallback } from 'react';
import { Person, UsePeopleReturn } from '@/types/people';
import {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} from '../services/peopleService';

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

  const removePerson = async (id: number) => {
    setIsLoading(true);
    try {
      await deletePerson(id);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Error deleting person'
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getPersonById = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('id', id);
      const data = await getPerson(id);
      console.log('data', data);
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al obtener la persona'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const editPerson = useCallback(
    async (id: number, person: Omit<Person, 'id'>) => {
      try {
        setIsLoading(true);
        setError(null);
        await updatePerson(id, person);
        await fetchPeople();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al actualizar la persona'
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
    removePerson,
    getPersonById,
    editPerson,
  };
};
