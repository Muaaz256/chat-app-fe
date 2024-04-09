import { useContext, useMemo } from 'react';
import { ChatContext } from '../../contexts/chatContext';
import { Row } from 'antd';
import ChattingArea from '../ChattingArea';

const MessageBox = () => {
  const { users, selectedUserId, messages } = useContext(ChatContext);

  const usersCount = useMemo(() => {
    return Object.keys(users).length;
  }, [users]);

  const selectedUser = useMemo(() => {
    return users[selectedUserId];
  }, [selectedUserId, users]);

  const messagesList = useMemo(() => {
    return messages[selectedUserId];
  }, [selectedUserId, messages]);

  return (
    <Row
      style={{ width: '100%', height: '100%' }}
      justify="center"
      align="middle"
    >
      {usersCount === 0 ? (
        'No chat to show'
      ) : (
        <ChattingArea selectedUser={selectedUser} messages={messagesList} />
      )}
    </Row>
  );
};

export default MessageBox;
