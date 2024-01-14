import { createReservation } from "@/api/repositories/reservation";
import Input from "@/common/components/Input";
import PopUp from "@/common/components/PopUp";
import Button from "@/common/components/buttons/Button";
import { MESSAGE_TYPES, MessageContext } from "@/common/context/messageContext";
import { UserContext } from "@/common/context/userContext";
import React, { useContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import TextArea from "@/common/components/TextArea";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import moment from "moment";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Reservation = ({ data, setData }) => {
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

  const handleCreateReservation = (date) => {
    const payload = {};
    payload.user = user.id;
    payload.car = data;
    payload.reservation_date = moment(date).format("YYYY-MM-DDTHH:mm:ss");

    handleCreateReservationMutation.mutate(payload);
  };

  const validateTime = (slotTime) => {
    const from = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      7,
      0,
      0
    );

    const to = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      19,
      0,
      0
    );

    const isValid =
      slotTime.getTime() > from.getTime() && slotTime.getTime() < to.getTime();

    return isValid;
  };

  return (
    <PopUp setShow={setData}>
      <Wrapper>
        <div>
          <DayTimePicker
            isLoading={handleCreateReservation.isLoading}
            timeSlotSizeMinutes={60}
            timeSlotValidator={validateTime}
            onConfirm={handleCreateReservation}
            confirmText="Zarezerwuj"
            loadingText={"Rezerwowanie ..."}
          />
        </div>
      </Wrapper>
    </PopUp>
  );
};

export default Reservation;
