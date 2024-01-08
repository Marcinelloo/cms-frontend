import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../images/logo.jpg";
import { Link } from "react-router-dom";
import store from "@/api/store";
import { UserContext } from "@/common/context/userContext";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 40px;

  gap: 40px;
`;

const ImageWrapper = styled(Link)`
  width: 80px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CustomLink = styled(Link)`
  margin: 0px 30px 0px 0px;
  letter-spacing: 0px;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  text-decoration: none;
  color: rgb(174, 0, 0);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonLogin = styled(Link)`
  width: auto;
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  overflow: hidden;
  outline: none;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.3s ease 0s;
  user-select: none;
  cursor: pointer;
  min-width: auto;
  height: 32px;
  padding: 0px 16px;
  color: rgb(174, 0, 0);
  font-weight: 600;
  font-size: 1rem;
  text-transform: none;
  border: 1.5px solid rgb(216, 216, 216);
  border-radius: 22px;
  align-items: center;
  display: flex;

  &:hover {
    transform: scale(1.1);
  }
`;

const TopBar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Wrapper>
      <ImageWrapper to="/">
        <img src={Logo} alt="Logo" />
      </ImageWrapper>
      <LinkWrapper>
        <CustomLink to="">oferta</CustomLink>
        <CustomLink>marki</CustomLink>
        <CustomLink to="/blog">blog</CustomLink>
        <CustomLink to="/contact">kontakt</CustomLink>
        <CustomLink to="/about-us">o nas</CustomLink>
        {user && (
          <>
            <CustomLink to="/my-reservations">reservations </CustomLink>
            <CustomLink to="/my-cars">moje Auta</CustomLink>
            <CustomLink to="/profile">profil {user?.email}</CustomLink>
          </>
        )}
      </LinkWrapper>
      <div style={{ flex: "1" }}></div>
      {!user ? (
        <ButtonLogin to="/login">zaloguj się</ButtonLogin>
      ) : (
        <ButtonLogin
          onClick={() => {
            store.logOut();
            setUser(() => null);
          }}
        >
          Wyloguj sie
        </ButtonLogin>
      )}
    </Wrapper>
  );
};

export default TopBar;
