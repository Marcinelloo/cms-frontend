import { loginUser } from "@/api/repositories/user";
import React, { useContext, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import store from "@/api/store";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/common/context/userContext";

const PageContainer = styled.div`
  min-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  min-height: 75vh;
`;

const Heading = styled.h2`
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  color: #333;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin: 0 auto;
`;

const SubText = styled.div`
  text-align: right;
  margin: 10px 0;
  width: 100%;
`;
const CustomLink = styled(Link)``;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLoginMutation = useMutation({
    mutationFn: (value) => loginUser(value),
    onSuccess: ({ data }) => {
      store.setTokens(data);
      setUser(() => data.user);
      navigate("/");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    const payload = {};
    payload.identifier = emailRef.current.value;
    payload.password = passwordRef.current.value;

    handleLoginMutation.mutate(payload);
  };

  return (
    <PageContainer>
      <Heading>Login</Heading>
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Label>Email</Label>
          <Input ref={emailRef} type="email" required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" ref={passwordRef} required />
        </FormGroup>
        <SubText>
          Nie masz konta? <CustomLink to={"/register"}>Zarejestruj</CustomLink>
        </SubText>
        <Button type="submit">Login</Button>
      </Form>
    </PageContainer>
  );
};

export default Login;
