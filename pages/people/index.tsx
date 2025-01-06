import React, { useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';
import {
  PeopleProvider,
  usePeopleContext,
} from '../../context/people/PeopleContext';
import { Person } from '@/types/people';
import { usePeople } from '../../hooks/usePeople';

type Column = {
  key: 'firstName' | 'lastName' | 'email' | 'phone' | 'actions';
  label: string;
};

const PeoplePage: React.FC = () => {
  const { people: peopleFromHook, isLoading, error, fetchPeople } = usePeople();
  const { people, setPeople, setModalType, setSelectedPerson } =
    usePeopleContext();

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    if (peopleFromHook) {
      setPeople(peopleFromHook);
    }
  }, [peopleFromHook, setPeople]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const columns: readonly Column[] = [
    { key: 'firstName', label: 'Nombre' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'actions', label: 'Acciones' },
  ] as const;

  const handleEdit = (person: Person): void => {
    setModalType('edit');
    setSelectedPerson(person);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Personas</h1>
        <Button color="primary">Agregar Persona</Button>
      </div>

      <Table
        aria-label="Tabla de personas"
        classNames={{
          wrapper: 'min-h-[400px]',
        }}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={'No hay datos'}>
          {people.map((person: Person) => (
            <TableRow key={person.id}>
              <TableCell>{person.first_name}</TableCell>
              <TableCell>{person.last_name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.phone}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => handleEdit(person)}
                  >
                    Editar
                  </Button>
                  <Button size="sm" color="danger">
                    Eliminar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const People = () => {
  return (
    <PeopleProvider>
      <PeoplePage />
    </PeopleProvider>
  );
};

export default People;
