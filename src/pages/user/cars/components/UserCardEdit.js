import { createCar, updateCar } from "@/api/repositories/car";
import Input from "@/common/components/Input";
import PopUp from "@/common/components/PopUp";
import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
const Tilte = styled.h3``;

const UserCardEdit = ({ car, setCar }) => {
  const modelRef = useRef();

  const handleUpdateCarMutation = useMutation({
    mutationFn: (value) => updateCar(value),
    onSuccess: () => {
      setTimeout(() => {
        setCar(null);
      }, 5000);
    },
  });

  const handleCreateCarMutation = useMutation({
    mutationFn: (value) => createCar(value),
    onSuccess: () => {
      setTimeout(() => {
        setCar(null);
      }, 5000);
    },
  });

  const handleUpdateCar = (e) => {
    e.preventDefault();

    const payload = {};
    payload.model = modelRef.current.value;

    if (car.id) {
      payload.id = car.id;
      handleUpdateCarMutation.mutate(payload);
      return;
    }

    handleCreateCarMutation.mutate(payload);
  };

  return (
    <PopUp setShow={setCar}>
      <Tilte>{car ? "Edytuj" : "Dodaj"} Samochod </Tilte>
      <form onSubmit={handleUpdateCar}>
        <Input label={"Model"} value={car.model} inputRef={modelRef} required />
        <button type="submit">Save</button>
      </form>
    </PopUp>
  );
};

export default UserCardEdit;
