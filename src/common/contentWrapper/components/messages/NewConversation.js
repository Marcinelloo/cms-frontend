import React, { useRef, useState } from "react";
import PopUp from "../../../components/PopUp";
import styled from "styled-components";
import Input from "../../../components/Input";
import Icon from "../../../components/Icon";
import { searchUser } from "@/api/repositories/user/user";
import { useMutation } from "@tanstack/react-query";
import Button from "../../../components/buttons/Button.jsx";
import Loading from "@/common/components/Loading";

const Title = styled.h3``;

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
`;

const Element = styled.div`
  display: flex;
  padding: 5px 13px;
  align-items: center;
  gap: 20px;
`;

const SelectedWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  max-width: 400px;
  flex-wrap: wrap;
`;

const SelectedElement = styled.div`
  color: red;
  cursor: pointer;
`;

const UsersWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const NewConversation = ({ setShow, handleStartConversation }) => {
  const inputRef = useRef();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSectedUsers] = useState([]);

  const searchUsersMutation = useMutation({
    mutationFn: (payload) => searchUser(payload.username),
    onSuccess: ({ data }) => {
      setUsers(data);
    },
  });

  const handleFindUsers = () => {
    if (!inputRef?.current?.value) {
      return;
    }

    const payload = {};
    payload.username = inputRef.current.value;

    searchUsersMutation.mutate(payload);
  };

  return (
    <>
      {searchUsersMutation.isLoading && <Loading />}
      <PopUp setShow={setShow}>
        <Title>Find your friend!</Title>
        <SelectedWrapper>
          Selected:{" "}
          {selectedUsers.map((su) => (
            <SelectedElement
              onClick={() =>
                setSectedUsers((prev) => [
                  ...prev.filter((p) => p.id !== su.id),
                ])
              }
            >
              {su.username}
            </SelectedElement>
          ))}
        </SelectedWrapper>
        <SearchWrapper>
          <Input
            width="400px"
            inputRef={inputRef}
            required={true}
            handleOnKeydownButton={handleFindUsers}
          />
          <Icon
            iconName="fa fa-search"
            color="red"
            onClick={() => handleFindUsers()}
          />
        </SearchWrapper>
        <UsersWrapper>
          {users
            .filter((u) => !selectedUsers?.map((su) => su.id)?.includes(u.id))
            .map((user) => (
              <Element>
                <div style={{ minWidth: "340px" }}>{user.username}</div>
                <Button
                  type="report"
                  handler={() =>
                    setSectedUsers((prev) => [
                      ...prev.filter((p) => p.id !== user.id),
                      user,
                    ])
                  }
                  style={{ marginRight: "0" }}
                  text="ADD"
                />
              </Element>
            ))}
        </UsersWrapper>
        {selectedUsers.length > 0 && (
          <Button
            type="report"
            handler={() => handleStartConversation(selectedUsers)}
            text="Start Conversation"
            style={{
              marginRight: "0",
              marginTop: "20px",
              marginBottom: "-20px",
            }}
          />
        )}
      </PopUp>
    </>
  );
};

export default NewConversation;
