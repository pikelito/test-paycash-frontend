import React from 'react';
import {
  Table,
  Button,
  TableHeader,
  TableColumn,
  TableBody,
} from '@nextui-org/react';

const People = () => {
  const columns = [
    { key: 'firstName', label: 'Nombre' },
    { key: 'lastName', label: 'Apellido' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'actions', label: 'Acciones' },
  ];

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
        <TableBody>{/* Contenido de la tabla */}</TableBody>
      </Table>
    </div>
  );
};

export default People;
