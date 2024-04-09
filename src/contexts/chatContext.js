import React, { useEffect, useState } from 'react';
import Chance from 'chance';
import { v4 as UUIDv4 } from 'uuid';
import { socket } from '../socket';

const chance = new Chance();

const MY_DATA = {
  name: chance.name(),
  id: UUIDv4()
};

export const ChatContext = React.createContext({
  users: {},
  myData: {},
  selectedUserId: null,
  setSelectedUserId: (userId) => {},
  messages: {},
  setMessages: () => {},
  unSeenMessagesCount: {},
  setUnSeenMessagesCount: () => {}
});

const ChatContextProvider = ({ children }) => {
  const [chatUsers, setChatUsers] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState({});
  const [unSeenMessagesCount, setUnSeenMessagesCount] = useState({});

  const onUserJoined = (newUser) => {
    if (newUser.id === MY_DATA.id) return;
    setChatUsers((prevState) => {
      if (Object.keys(prevState).length === 0) setSelectedUserId(newUser.id);
      return {
        ...prevState,
        [newUser.id]: {
          ...newUser
        }
      };
    });
    setMessages((prevState) => {
      const newMessages = {
        ...prevState
      };
      newMessages[newUser.id] = [];
      return { ...newMessages };
    });
    setUnSeenMessagesCount((prevState) => {
      const newMessagesCount = {
        ...prevState
      };
      newMessagesCount[newUser.id] = 0;
      return { ...newMessagesCount };
    });
  };

  const onNewMessage = (newMessage) => {
    console.log(newMessage);
  };

  const onUserLeft = (userData) => {
    setChatUsers((prevState) => {
      const newState = {
        ...prevState
      };
      delete newState[userData.id];
      return {
        ...newState
      };
    });
  };

  const onSocketConnect = () => {
    socket.emit('user_connected', MY_DATA);
  };

  const onGetConnectedUsers = (users) => {
    if (Object.keys(users).length === 0) return;
    setSelectedUserId(Object.values(users)[0].id);
    const newUsers = {};
    const newMessages = {};
    const newMessagesCount = {};
    Object.entries(users).forEach(([key, value]) => {
      newUsers[value.id] = {
        ...value
      };
      newMessages[value.id] = [];
      newMessagesCount[value.id] = 0;
    });
    setChatUsers((prevState) => {
      return { ...prevState, ...newUsers };
    });
    setMessages((prevState) => ({ ...prevState, ...newMessages }));
    setUnSeenMessagesCount((prevState) => ({
      ...prevState,
      ...newMessagesCount
    }));
  };

  useEffect(() => {
    socket.connect();
    socket.on('connect', onSocketConnect);
    socket.on('get_connected_users', onGetConnectedUsers);
    socket.on('user_joined', onUserJoined);
    socket.on('new_message', onNewMessage);
    socket.on('user_left', onUserLeft);

    return () => {
      socket.off('user_joined', onUserJoined);
      socket.off('new_message', onNewMessage);
      socket.off('user_left', onUserLeft);
      socket.off('connect', onSocketConnect);
      socket.off('get_connected_users', onGetConnectedUsers);
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        users: chatUsers,
        myData: MY_DATA,
        selectedUserId,
        setSelectedUserId,
        messages,
        setMessages,
        unSeenMessagesCount,
        setUnSeenMessagesCount
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
