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
  sendMessage: (message) => {},
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
      if (Object.keys(prevState).length === 0) {
        setSelectedUserId(newUser.id);
      }
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

  const onReceiveMessage = (message) => {
    const { from } = message;
    setMessages((prevState) => ({
      ...prevState,
      [from]: [
        ...prevState[from],
        {
          message: message.message,
          time: message.time,
          isReceived: true
        }
      ]
    }));
    if (from === selectedUserId) return;
    setUnSeenMessagesCount((prevState) => {
      return {
        ...prevState,
        [from]: prevState[from] + 1
      };
    });
  };

  const sendMessage = (message) => {
    socket.emit('new_message', {
      ...message,
      from: MY_DATA.id,
      to: selectedUserId
    });
    setMessages((prevState) => ({
      ...prevState,
      [selectedUserId]: [
        ...prevState[selectedUserId],
        {
          ...message,
          isReceived: false
        }
      ]
    }));
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
    setMessages((prevState) => {
      const newState = {
        ...prevState
      };
      delete newState[userData.id];
      return {
        ...newState
      };
    });
    setUnSeenMessagesCount((prevState) => {
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
    Object.values(users).forEach((value) => {
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
    socket.on('user_left', onUserLeft);

    return () => {
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('connect', onSocketConnect);
      socket.off('get_connected_users', onGetConnectedUsers);
    };
  }, []);

  useEffect(() => {
    socket.on('receive_message', onReceiveMessage);
    return () => {
      socket.off('receive_message', onReceiveMessage);
    };
  }, [selectedUserId]);

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
        setUnSeenMessagesCount,
        sendMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
