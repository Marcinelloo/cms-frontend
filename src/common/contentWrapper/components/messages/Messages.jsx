import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import avatarImage from "@/common/icons/avatar.png";
import SearchBar from "@/common/components/search/SearchBar";
import Icon from "@/common/components/Icon";
import PopUp from "@/common/components/PopUp";
import NewConversation from "./NewConversation";
import { useMutation } from "@tanstack/react-query";
import {
  findUserConversations,
  searchConversation,
} from "@/api/repositories/conversation";
import store from "@/api/store";
import { SocketMessageContext } from "@/common/context/socket-message.context";
import moment from "moment/moment";

const MessagesWrapper = styled.div`
  display: flex;
  height: 80vh;
  width: 90vw;
  overflow: hidden;
  border-radius: 15px;
`;

const Discussions = styled.section`
  height: calc(80vh - 30px);
  overflow-y: auto;
`;

const Discussion = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 15px 0 0 15px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#e0e0e0" : "transparent")};
`;

const Photo = styled.div`
  width: 50px;
  height: 50px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 15px;
`;

const DescContact = styled.div`
  flex: 1;
`;

const Name = styled.p`
  font-weight: bold;
`;

const Message = styled.p`
  color: #777;
  width: 15vw;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Timer = styled.div`
  color: #aaa;
`;

const Chat = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HeaderChat = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f0f0f0;
  height: 60px;
  border-radius: 0 15px 15px 0;
`;
const DiscussionsAndSearch = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  overflow-y: auto;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 60px;
`;

const NameHeader = styled.p`
  font-weight: bold;
  flex: 1;
`;

const MessagesChat = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  overflow-y: auto;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.isYou ? "right" : "left")};
  margin-bottom: 15px;
`;

const MessageTextContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
`;

const MessageText = styled.p`
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  background-color: ${(props) => (props.isYou ? "#3C7DB3" : "#f2ae44")};
  color: ${(props) => (props.isYou ? "white" : "black")};
`;

const Time = styled.p`
  font-size: 12px;
  color: #aaa;
  margin-left: auto;
`;

const WriteMessage = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
`;

const SendButton = styled.i`
  font-size: 20px;
  color: #007bff;
  cursor: pointer;
`;

const FooterChat = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f0f0f0;
`;

const SubText = styled.div`
  font-size: 12px;
  font-style: italic;
  color: lightgrey;
`;

const Messages = ({ setShow }) => {
  const {
    handleSendMessage,
    currentDiscussion,
    setCurrentDiscussion,
    filteredDiscussions,
    notSeenMessages,
    setFiltredDiscusions,
    findUserConversationsMutation,
    seenByUserMutation,
    setNotSeenMessages,
  } = useContext(SocketMessageContext);
  const messageRef = useRef();

  const [newConversation, setNewConversation] = useState();
  const [searchText, setSearchText] = useState("");

  const searchConversationMutation = useMutation({
    mutationFn: (payload) => searchConversation(payload.userIds),
    onSuccess: async ({ data }) => {
      await findUserConversationsMutation.mutate();
      setNewConversation(null);
    },
  });

  const handleStartConversation = (users) => {
    const usersIds = users.map((u) => u.id);

    const payload = {
      userIds: usersIds,
    };

    searchConversationMutation.mutate(payload);
  };

  const handleSendMessageToUser = () => {
    const message = messageRef.current.value;
    const conversationId = currentDiscussion.id;

    const payload = {
      message,
      conversationId,
    };

    handleSendMessage(payload);
    messageRef.current.value = "";
  };

  return (
    <>
      <PopUp setShow={setShow} closeIcon={false} paddingCard="0px">
        <MessagesWrapper>
          <Chat>
            <HeaderChat>
              <Icon className="fa fa-user-o" />
              <NameHeader>
                {currentDiscussion?.users
                  ?.map((u) => u.firstName + " " + u.lastName)
                  .join(", ") || "Write to someone!"}
              </NameHeader>
              <Icon className="fa fa-ellipsis-h right" />
            </HeaderChat>
            {!currentDiscussion ? (
              <>
                <MessagesChat />
                <FooterChat>
                  <Icon
                    className="fa fa-smile-o clickable"
                    style={{ fontSize: "25pt" }}
                  />
                  <WriteMessage
                    type="text"
                    placeholder="Type your message here"
                  />
                  <SendButton
                    className="fa fa-paper-plane-o clickable"
                    style={{ fontSize: "20pt" }}
                  />
                </FooterChat>
              </>
            ) : (
              <>
                <MessagesChat>
                  {currentDiscussion?.messages
                    ?.sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    )
                    .map((message, index) => (
                      <MessageContainer
                        key={index}
                        isYou={message.sender.id === store.getUser().id}
                      >
                        {message.sender.id !== store.getUser().id && (
                          <div>
                            <Photo image={avatarImage} />
                            <SubText>
                              {message.sender.firstName}{" "}
                              {message.sender.lastName} <br></br>
                              {moment(message.createdAt).format("DD/MM HH:mm")}
                            </SubText>
                          </div>
                        )}
                        <MessageText
                          isYou={message.sender.id === store.getUser().id}
                        >
                          {message.content}
                        </MessageText>
                        {message.sender.id === store.getUser().id && (
                          <div>
                            <Photo image={avatarImage} />
                            <SubText>
                              {message.sender.firstName}{" "}
                              {message.sender.lastName} <br></br>
                              {moment(message.createdAt).format("DD/MM HH:mm")}
                            </SubText>
                          </div>
                        )}
                      </MessageContainer>
                    ))}
                </MessagesChat>
                <FooterChat>
                  <Icon
                    className="fa fa-smile-o clickable"
                    style={{ fontSize: "25pt" }}
                  />
                  <WriteMessage
                    ref={messageRef}
                    type="text"
                    placeholder="Type your message here"
                  />
                  <SendButton
                    className="fa fa-paper-plane-o clickable"
                    style={{ fontSize: "20pt" }}
                    onClick={() => handleSendMessageToUser()}
                  />
                </FooterChat>
              </>
            )}
          </Chat>
          <DiscussionsAndSearch>
            <SearchBarWrapper>
              <SearchBar
                searchText={searchText}
                onChange={setSearchText}
                placeholder="min 2 letters"
              />
              <Icon
                iconName="fa-solid fa-add"
                style={{ paddingLeft: "10px", fontSize: "20pt" }}
                onClick={() => setNewConversation(true)}
              />
            </SearchBarWrapper>
            <Discussions>
              {filteredDiscussions
                ?.filter((a) => {
                  let hasSthSimilar = false;

                  if (searchText.length < 3) {
                    return true;
                  }

                  a.users.forEach((u) => {
                    if (
                      (u.firstName + u.lastName)
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    ) {
                      hasSthSimilar = true;
                    }
                  });

                  return hasSthSimilar;
                })
                .map((discussion, index) => (
                  <Discussion
                    key={index}
                    active={discussion?.id === currentDiscussion?.id}
                    onClick={() => {
                      setCurrentDiscussion(discussion);
                      seenByUserMutation.mutate({
                        conversation: discussion.id,
                      });
                      setNotSeenMessages((nt) =>
                        nt.filter((f) => f !== discussion.id)
                      );
                    }}
                  >
                    {notSeenMessages?.includes(discussion.id) && (
                      <div
                        style={{
                          marginTop: "-40px",
                          marginRight: "10px",
                          marginLeft: "-10px",
                        }}
                      >
                        <Icon
                          iconName={"fa fa-info"}
                          style={{ fontSize: "14px", color: "red" }}
                        />
                      </div>
                    )}
                    <Photo image={avatarImage} />
                    <DescContact>
                      {discussion?.users
                        .filter((d) => d.id !== store.getUser().id)
                        .map((d) => d.firstName + " " + d.lastName)
                        .join(", ")}
                      <br></br>
                      {discussion?.messages[0]?.content}
                    </DescContact>
                  </Discussion>
                ))}
            </Discussions>
          </DiscussionsAndSearch>
        </MessagesWrapper>
      </PopUp>
      {newConversation && (
        <NewConversation
          setShow={setNewConversation}
          handleStartConversation={handleStartConversation}
        />
      )}
    </>
  );
};

export default Messages;
