import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #f6f6f6;
  padding: 20px;
`;

const Title = styled.h4`
  padding: 50px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  height: 100%;
  width: 100%;
  height: auto;
  margin: 0px;
  padding: 0px;
  background-color: rgb(255, 255, 255);
  color: rgb(38, 34, 30);
  border: 0px;
  border-radius: 0px;
  cursor: default;
  text-align: left;
  max-width: 500px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleCard = styled.div`
  margin: 0px;
  transition: color 0.3s ease 0s;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  letter-spacing: 0px;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;

const SubText = styled.div`
  margin: 0px;
  transition: color 0.3s ease 0s;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  letter-spacing: 0px;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
`;

const CustomLink = styled(Link)`
  color: rgb(0, 101, 177);
  font-weight: 600;
  font-size: inherit;
  text-decoration: none;
`;

const CONFIG = [
  {
    icon: "",
    name: "napisz do nas",
    subText: "nasi konsultanci odpowiedzą tak szybko, jak to możliwe",
    contact: "auto@coscos.pl",
  },
  {
    icon: "",
    name: "zadzwoń do nas",
    subText: "od poniedziałku do soboty 9:00 - 22:00",
    contact: "+48 222 22 22 22",
  },
];

const Contact = () => {
  return (
    <Wrapper>
      <Title>nie znalazles jakiegos samochodu? Masz jakies pytania?</Title>
      <CardWrapper>
        {CONFIG.map((c) => (
          <Card>
            <img src={c.icon} />
            <TitleCard>{c.name}</TitleCard>
            <SubText>{c.subText}</SubText>
            <CustomLink to="contact">{c.contact}</CustomLink>
          </Card>
        ))}
      </CardWrapper>
    </Wrapper>
  );
};

export default Contact;
