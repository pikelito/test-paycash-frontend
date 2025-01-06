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

export const PersonFormModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, modalType, setPeople, selectedPerson } =
    usePeopleContext();
  const {
    addPerson,
    editPerson,
    isLoading,
    fetchPeople,
    people,
    getPersonById,
  } = usePeople();
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

  useEffect(() => {
    const loadPerson = async () => {
      if (modalType === 'edit' && selectedPerson?.id) {
        try {
          const person = await getPersonById(selectedPerson.id);
          console.log('person', person);
          if (person) {
            setFormData({
              first_name: person.first_name,
              last_name: person.last_name,
              email: person.email,
              phone: person.phone,
              birthdate: person.birthdate,
              address: person.address,
            });
          }
        } catch (error) {
          console.error('Error al cargar persona:', error);
        }
      }
    };

    if (modalType === 'add') {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        birthdate: '',
        address: '',
      });
    } else {
      loadPerson();
    }
  }, [modalType, selectedPerson, getPersonById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalType === 'edit' && selectedPerson?.id) {
        await editPerson(selectedPerson.id, formData);
      } else {
        await addPerson(formData);
      }
      handleClose();
    } catch (error) {
      console.error('Error al procesar persona:', error);
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
      isOpen={isModalOpen && (modalType === 'add' || modalType === 'edit')}
      onClose={handleClose}
      placement="center"
    >
      <ModalContent>
        <form onSubmit={handleSubmit} data-testid="person-form">
          <ModalHeader>
            {modalType === 'add' ? 'Agregar Persona' : 'Editar Persona'}
          </ModalHeader>
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
