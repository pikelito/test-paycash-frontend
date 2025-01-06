import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { usePeopleContext } from '../../context/people/PeopleContext';
import { usePeople } from '../../hooks/usePeople';
import { Person } from '../../types/people';

export const DeletePersonModal: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    modalType,
    setPeople,
    selectedPerson,
    setSelectedPerson,
  } = usePeopleContext();
  const { removePerson, isLoading, fetchPeople, people } = usePeople();

  useEffect(() => {
    if (people) {
      setPeople(people);
    }
  }, [people, setPeople]);

  const handleDelete = async () => {
    if (selectedPerson) {
      try {
        await removePerson(selectedPerson.id);
        handleClose();
      } catch (error) {
        console.error('Error al eliminar persona:', error);
      }
    }
  };

  const handleClose = async () => {
    await fetchPeople();
    setSelectedPerson(null);
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen && modalType === 'delete'}
      onClose={handleClose}
      placement="center"
    >
      <ModalContent>
        <ModalHeader>Eliminar Persona</ModalHeader>
        <ModalBody>
          {selectedPerson && (
            <p>
              ¿Está seguro que desea eliminar a {selectedPerson.first_name}{' '}
              {selectedPerson.last_name}?
            </p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={handleClose}>
            Cancelar
          </Button>
          <Button
            color="danger"
            onPress={handleDelete}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
