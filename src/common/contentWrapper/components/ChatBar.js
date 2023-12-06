import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";
import SearchBar from "../../components/search/SearchBar";
import { useMutation } from "@tanstack/react-query";
import { getUsers } from "@/api/repositories/user/user";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

const ChatBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 98%;
  background-color: transparent;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 10;
`;

const IconWrapper = styled.div`
  position: relative;
`;

const UserList = styled.div`
  position: absolute;
  top: -240px;
  right: 16px;
  width: 160px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 100;
  border-radius: 12px;
`;

const ChatTabListWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 180px; //fixme: change according to isOpen
  padding-bottom: 10px;
`;

const ChatTabWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#f0f0f0" : "#e5e5e5")};
  gap: 18px;
`;

const ChatTabUsername = styled.div`
  font-weight: bold;
  text-transform: capitalize;
`;

const ChatTab = ({ user, active, onClick }) => {
  return (
    <ChatTabWrapper active={active} onClick={() => onClick(user)}>
      <Icon iconName="fa-solid fa-face-smile" />
      <ChatTabUsername>
        {user.firstName} {user.lastName}
      </ChatTabUsername>
      <Icon
        iconName="fa fa-close"
        style={{ color: "red", cursor: "pointer" }}
      />
    </ChatTabWrapper>
  );
};

const ChatTabList = ({ activeChatTabs, onClickTab }) => {
  return (
    <ChatTabListWrapper>
      {activeChatTabs.map((tab) => (
        <ChatTab
          key={tab.user.id}
          user={tab.user}
          active={tab.active}
          onClick={() => onClickTab(tab.user)}
        />
      ))}
    </ChatTabListWrapper>
  );
};

const ChatBar = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [activeChatTabs, setActiveChatTabs] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState({
    label: "All",
    value: "all",
  });
  const navigate = useNavigate();
  const handleIconClick = () => {
    setShowUserList(!showUserList);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const getUsersData = async () => {
    try {
      const response = await getUsers();
      setUsersData(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const mutation = useMutation({
    mutationFn: getUsersData,
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  const mapAndSortUsers = (
    usersData,
    sortColumn,
    sortDirection,
    filterStatus
  ) => {
    const sortedUsers = [...usersData].sort((a, b) => {
      if (sortColumn) {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
      return 0;
    });

    return sortedUsers.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(searchText.toLowerCase()) &&
        (filterStatus.value === "all" || user.status === filterStatus.value)
      );
    });
  };

  const filteredUsers = mapAndSortUsers(
    usersData,
    sortColumn,
    sortDirection,
    filterStatus
  );

  const handleUserButtonClick = (user) => {
    const isOpen = activeChatTabs.some((tab) => tab.user.id === user.id);
    if (!isOpen) {
      setActiveChatTabs([...activeChatTabs, { user, messages: [] }]);
    }
  };
  const handleOpenMessagesClick = () => {
    navigate("/messages");
  };

  const handleChatTabClick = (user) => {
    setCurrentChatUser(user);
    setActiveChatTabs(
      activeChatTabs.map((tab) => ({
        ...tab,
        active: tab.user.id === user.id,
      }))
    );
  };
  return (
    <ChatBarWrapper>
      <ChatTabList
        activeChatTabs={activeChatTabs}
        onClickTab={handleChatTabClick}
      />
      <IconWrapper>
        <Icon iconName="fa-solid fa-comment" onClick={handleIconClick} />
        {showUserList && (
          <UserList>
            <SearchBar searchText={searchText} onChange={handleSearchChange} />
            {filteredUsers.map((user) => (
              <Button
                key={user.firstName + user.lastName}
                type="User"
                text={`${user.firstName} ${user.lastName}`}
                handler={() => handleUserButtonClick(user)}
              />
            ))}
            <Button
              type="Messages"
              text="Open messages"
              handler={handleOpenMessagesClick}
            />
          </UserList>
        )}
      </IconWrapper>
    </ChatBarWrapper>
  );
};

export default ChatBar;
