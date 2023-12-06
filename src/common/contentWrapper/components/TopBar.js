import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import unitedKingdomFlag from "@/common/icons/flags/united-kingdom.png";
import polandFlag from "@/common/icons/flags/poland.png";
import Icon from "@/common/components/Icon";
import { useNavigate } from "react-router-dom";
import store from "@/api/store";
import { COLORS } from "@/common/colors/colors";
import Post from "@/components/post/Post";
import Weather from "@/common/components/dashboard/weather/Weather";
import Messages from "./messages/Messages";
import io from "socket.io-client";
import { SocketMessageContext } from "@/common/context/socket-message.context";
import {
  findUserConversations,
  seenByUser,
} from "@/api/repositories/conversation";
import { useMutation } from "@tanstack/react-query";
import { getLanguages, updateUserLanguage } from "@/api/repositories/language";
import { getUserCreatentials } from "@/api/repositories/user/user";
import { LanguageContext } from "@/common/context/languageContext";

const TopBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  gap: 10px;
`;

const FlagIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.2);
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    transform: scale(1.2);
  `}
`;

const LanguageMenu = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  padding: 10px;
  top: 50px;
  right: 60px;
  color: ${COLORS.first};
  font-size: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px lightgray;
  z-index: 99999;
  background: white;
`;

const TopBarNotification = styled.div`
  //box-shadow: 0px 0px 10px 0px lightgray;
  border-radius: 10px;
  padding: 2px 5px 2px 2px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 2px solid transparent;

  &:hover {
    cursor: pointer;
    border: 2px solid ${COLORS.second};
  }
`;

const FlagOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 20px;
  cursor: pointer;
  font-style: italic;

  &:hover {
    background-color: ${COLORS.lightGrey};
    border-radius: 10px;
  }
`;

const UserNameWrapper = styled.p`
  font-style: italic;
  color: ${COLORS.darkGrey};
`;

const FlagIconSmall = styled.img`
  width: 20px;
  height: 20px;
`;

const LANGUAGES = [
  {
    icon: unitedKingdomFlag,
    langLabel: "English",
    value: "english",
    altText: "United Kingdom",
  },
  {
    icon: polandFlag,
    langLabel: "Polish",
    value: "polish",
    altText: "Poland",
  },
];

const RedIcon = styled.div`
  color: red;
  margin-top: -20px;
  margin-left: -20px;
  font-size: 15px;
`;

const URL = process.env.REACT_APP_SOCKET_URL;

const TopBar = () => {
  const [languages, setLanguages] = useState([]);
  const [user, setUser] = useState({});

  const userFromStore = store?.getUser();

  const [showPost, setShowPost] = useState();
  const [showChat, setShowChat] = useState();
  const [isConnected, setIsConnected] = useState(false);

  const personalizationSettings = store.getPersonalizationSettings() || {};
  const { topBarTasks, topBarTests } = personalizationSettings;

  const { handleLoadTranslationsMutation } = useContext(LanguageContext);

  const socket = useMemo(() => io(`${URL}?token=${store.getToken()}`), []);

  const navigate = useNavigate();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const [currentDiscussion, setCurrentDiscussion] = useState(null);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [notSeenMessages, setNotSeenMessages] = useState([]);

  const handleLanguageClick = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const handleUserProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    store?.logOut();
    navigate("/login");
  };

  useEffect(() => {
    if (socket) {
      function onConnect() {
        setIsConnected(true);
      }

      function onDisconnect() {
        setIsConnected(false);
      }

      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${JSON.stringify(err)}`);
      });

      socket.on("incoming_message", (data) => {
        setFilteredDiscussions((prev) => {
          const looking = prev.find((e) => e.id === data.conversationId);

          if (!looking) return prev;

          looking.messages.push({
            content: data.message,
            createdAt: new Date(),
            sender: {
              id: data.id,
              firstName: data.firstName,
              lastName: data.lastName,
            },
          });

          setCurrentDiscussion((prev) => {
            if (prev?.id === looking.id) {
              setNotSeenMessages((values) => [
                ...values.filter((v) => v !== data.conversationId),
              ]);
              setCurrentDiscussion(() => looking);
              seenByUserMutation.mutate({ conversation: data.id });

              return looking;
            } else {
              setNotSeenMessages((values) => [...values, data.conversationId]);
            }

            return prev;
          });

          return [looking, ...prev.filter((d) => d.id !== data.conversationId)];
        });
      });

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }
  }, [socket]);

  const handleSendMessage = (payload) => {
    socket.emit("send_message", payload);
  };

  const seenByUserMutation = useMutation({
    mutationFn: (values) => seenByUser(values),
    onSuccess: ({ data }) => {},
  });

  const hasUserSeenConversation = (messages, id) => {
    const message = messages.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    const indlues = message?.seenBy
      ?.map((sb) => sb.id)
      ?.includes(userFromStore.id);

    if (!indlues) {
      return id;
    }

    return null;
  };

  const findUserConversationsMutation = useMutation({
    mutationFn: () => findUserConversations(),
    onSuccess: (data) => {
      const sorted =
        data?.data?.sort((a, b) => {
          a.messages = a.messages.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          b.messages = b.messages.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          if (
            new Date(b.messages[0]?.createdAt).getTime() >
            new Date(a.messages[0]?.createdAt).getTime()
          ) {
            return 1;
          }

          return -1;
        }) || [];

      if (currentDiscussion) {
        const current = sorted.find((c) => currentDiscussion.id === c.id);
        setCurrentDiscussion(current);
      }

      setFilteredDiscussions(sorted);

      const countNotSeen = sorted
        .reduce(
          (prev, next) => [
            ...prev,
            hasUserSeenConversation(next.messages, next.id),
          ],
          []
        )
        .filter((f) => f);

      setNotSeenMessages(countNotSeen);
    },
  });

  const getUserMutation = useMutation({
    mutationFn: () => getUserCreatentials(),
    onSuccess: ({ data }) => {
      setUser(data);
      setSelectedLanguage(
        languages?.find((l) => l.value.id === data.language.id) || {}
      );
    },
  });

  const updateUserLanguageMutation = useMutation({
    mutationFn: (payload) => updateUserLanguage(payload),
    onSuccess: (data) => {
      getUserMutation.mutate();
      handleLoadTranslationsMutation.mutate();
      setLanguageMenuOpen(false);
    },
  });

  const findLanguagesMutation = useMutation({
    mutationFn: () => getLanguages(),
    onSuccess: ({ data }) => {
      getUserMutation.mutate();
      setLanguages(data?.map((d) => ({ label: d.name, value: d })));
    },
  });

  useEffect(() => {
    findUserConversationsMutation.mutate();

    const interval = setInterval(() => {
      findUserConversationsMutation.mutate();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    findLanguagesMutation.mutate();
  }, []);

  return (
    <>
      <SocketMessageContext.Provider
        value={{
          handleSendMessage,
          currentDiscussion,
          setCurrentDiscussion,
          filteredDiscussions,
          setFilteredDiscussions: setFilteredDiscussions,
          findUserConversationsMutation,
          notSeenMessages,
          setNotSeenMessages,
          seenByUserMutation,
        }}
      >
        {showChat && <Messages setShow={setShowChat} />}
      </SocketMessageContext.Provider>
      <TopBarWrapper>
        <div>
          <Weather />
        </div>
        {topBarTasks && (
          <TopBarNotification>
            <p>TASKS TO COMPLETE: 7</p>
          </TopBarNotification>
        )}
        {topBarTests && (
          <TopBarNotification>
            <p>UPCOMING TESTS: 5</p>
          </TopBarNotification>
        )}
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <UserNameWrapper>{store?.getUser()?.username}</UserNameWrapper>
          <Icon
            iconName={"fa-solid fa-comments"}
            style={{
              fontSize: "20px",
              color: COLORS.grey,
            }}
            onClick={() => setShowChat(true)}
          />
          {notSeenMessages.length > 0 && (
            <RedIcon>{notSeenMessages.length}</RedIcon>
          )}
          <Icon
            iconName={"fa-solid fa-user"}
            style={{
              fontSize: "20px",
              color: COLORS.grey,
            }}
            onClick={handleUserProfileClick}
          />
          <div onClick={handleLanguageClick}>{selectedLanguage.label}</div>
          <Icon
            iconName={"fa fa-sign-out"}
            style={{ color: COLORS.accent }}
            onClick={() => handleLogout()}
          />
        </div>
        <LanguageMenu open={languageMenuOpen}>
          {languages
            .filter((l) => l.label !== selectedLanguage.label)
            .map((language) => (
              <FlagOption
                key={language.label}
                onClick={() => {
                  updateUserLanguageMutation.mutate(language.value.id);
                }}
              >
                {language.label}
              </FlagOption>
            ))}
        </LanguageMenu>
        {showPost && <Post setShowPost={setShowPost} />}
      </TopBarWrapper>
    </>
  );
};

export default TopBar;
