import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "@/common/context/userContext";
import { findUserReservations } from "@/api/repositories/reservation";
import styled from "styled-components";
import Loading from "@/common/components/Loading";
import { Link } from "react-router-dom";
import moment from "moment";
import Icon from "@/common/components/Icon";

const ReservationsContainer = styled.div`
  text-align: center;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 250px;
  text-align: left;
`;

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const { user } = useContext(UserContext);

  const handleFindReservationsMutation = useMutation({
    mutationFn: (values) => findUserReservations(values),
    onSuccess: ({ data }) => {
      console.log(data);
      setReservations(data.data);
    },
  });

  useEffect(() => {
    handleFindReservationsMutation.mutate(user.id);
  }, [user.id]);

  return (
    <>
      {handleFindReservationsMutation.isLoading && <Loading />}
      <ReservationsContainer>
        <h2>Your Reservations</h2>
        {handleFindReservationsMutation.isError && (
          <p>Error fetching reservations</p>
        )}

        {handleFindReservationsMutation.isSuccess && (
          <CardsContainer>
            {reservations.map((reservation) => {
              const car = reservation?.attributes?.car?.data || {};

              return (
                <>
                  <Card key={reservation.id}>
                    <Link to={`/car/${car.id}`}>
                      Car : {car?.attributes.brand}, {car?.attributes.model},{" "}
                      {car?.attributes.year}, {car.price}
                    </Link>
                    <br />
                    <strong>Reserved On:</strong>{" "}
                    {moment(reservation.attributes.reservation_date).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                    <br />
                    <strong>Confirmation Status:</strong>{" "}
                    {reservation.attributes.confirmed
                      ? "Zaakceptowano"
                      : "Weryfikacja"}
                  </Card>
                </>
              );
            })}
          </CardsContainer>
        )}
      </ReservationsContainer>
    </>
  );
};

export default Reservations;
