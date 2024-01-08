import { createReservation } from "@/api/repositories/reservation";
import Input from "@/common/components/Input";
import PopUp from "@/common/components/PopUp";
import Button from "@/common/components/buttons/Button";
import { MESSAGE_TYPES, MessageContext } from "@/common/context/messageContext";
import { UserContext } from "@/common/context/userContext";
import moment from "moment";
import React, { useContext, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px;
  margin-bottom: -30px;
`;

const Reservation = ({ data, setData }) => {
  const reservationDateRef = useRef();
  const descriptionRef = useRef();

  const { handleAddMessage } = useContext(MessageContext);
  const { user } = useContext(UserContext);

  const handleCreateReservationMutation = useMutation({
    mutationFn: (values) => createReservation(values),
    onSuccess: () => {
      handleAddMessage(
        "Zarezerwowano. Sprawdz swoje rezerwacje",
        MESSAGE_TYPES.CORRECT
      );
      setData(() => null);
    },
  });

  const handleCreateReservation = (e) => {
    e.preventDefault();

    const payload = {};

    payload.user = user.id;
    payload.car = data;
    payload.reservation_date = reservationDateRef.current.value;
    payload.description = descriptionRef.current.value;

    handleCreateReservationMutation.mutate(payload);
  };

  return (
    <PopUp setShow={setData}>
      <Form onSubmit={handleCreateReservation}>
        <Input
          label={"Date"}
          type={"datetime-local"}
          inputRef={reservationDateRef}
          required
          labelStyle={{
            width: "100px",
          }}
          width={"300px"}
        />
        <Input
          labelStyle={{
            width: "100px",
          }}
          label={"Description"}
          type={"text"}
          inputRef={descriptionRef}
          required
          width={"300px"}
        />
        <Button type={"submit"} text={"submit"} />
      </Form>
    </PopUp>
  );
};

export default Reservation;
