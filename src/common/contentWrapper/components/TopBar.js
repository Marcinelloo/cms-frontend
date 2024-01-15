import React, { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../images/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import store from "@/api/store";
import { UserContext } from "@/common/context/userContext";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 40px;
  gap: 40px;
`;

const ImageWrapper = styled(Link)`
  min-width: 60px;
  max-width: 60px;

  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    display: ${(props) => (props.showMenu ? "flex" : "none")};
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 80px;
    left: 0;
    background-color: #fff;
    padding: 10px;
    z-index: 99999999999;
    width: 100%;
  }
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

const HamburgerButton = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 600px) {
    display: block;
  }
`;

const TopBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Wrapper>
      <ImageWrapper to="/">
        <img src={Logo} alt="Logo" />
      </ImageWrapper>
      <LinkWrapper showMenu={showMenu}>
        <CustomLink to="/blog">blog</CustomLink>
        <CustomLink to="/contact">kontakt</CustomLink>
        <CustomLink to="/about-us">o nas</CustomLink>
        <CustomLink to="/reviews">opinie</CustomLink>
        {user && (
          <>
            <CustomLink to="/my-reservations">rezerwacje</CustomLink>
            <CustomLink to="/my-cars">moje Auta</CustomLink>
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
            navigate("/");
          }}
        >
          Wyloguj sie
        </ButtonLogin>
      )}
      <HamburgerButton onClick={() => setShowMenu(!showMenu)}>
        ☰
      </HamburgerButton>
    </Wrapper>
  );
};

export default TopBar;
