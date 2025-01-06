import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { usePeopleContext } from '../../context/people/PeopleContext';
import { usePeople } from '../../hooks/usePeople';
import { Person } from '../../types/people';

export const AddPersonModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, modalType, setPeople } =
    usePeopleContext();
  const { addPerson, isLoading, fetchPeople, people } = usePeople();
  const [formData, setFormData] = React.useState<Omit<Person, 'id'>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birthdate: '',
    address: '',
  });

  useEffect(() => {
    if (people) {
      setPeople(people);
    }
  }, [people, setPeople]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPerson(formData);
      //
      handleClose();
    } catch (error) {
      console.error('Error al crear persona:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      birthdate: '',
      address: '',
    });
    fetchPeople();
  };

  return (
    <Modal
      isOpen={isModalOpen && modalType === 'add'}
      onClose={handleClose}
      placement="center"
    >
      <ModalContent>
        <form onSubmit={handleSubmit} data-testid="add-person-form">
          <ModalHeader>Agregar Persona</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Nombre"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <Input
                label="Apellido"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Fecha de Nacimiento"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
              />
              <Input
                label="Dirección"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleClose}>
              Cancelar
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
