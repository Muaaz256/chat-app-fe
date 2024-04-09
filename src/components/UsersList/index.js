import { Col, Row } from 'antd';
import UserCard from './UserCard';
import { useContext, useEffect, useMemo } from 'react';
import { ChatContext } from '../../contexts/chatContext';

const UsersList = () => {
  const {
    myData,
    users,
    setSelectedUserId,
    selectedUserId,
    unSeenMessagesCount,
    setUnSeenMessagesCount
  } = useContext(ChatContext);

  const usersList = useMemo(() => {
    return Object.values(users);
  }, [users]);

  useEffect(() => {
    if (usersList.length === 0) {
      setSelectedUserId(null);
      return;
    }
    const selectedUser = usersList.find((user) => user.id === selectedUserId);
    if (!selectedUser) {
      setSelectedUserId(usersList[0].id);
    }
  }, [usersList.length]);

  const onSelectUser = (userId) => {
    if (selectedUserId === userId) return;
    setSelectedUserId(userId);
    setUnSeenMessagesCount({
      ...unSeenMessagesCount,
      [userId]: 0
    });
  };

  return (
    <Row justify="center" style={{ marginTop: 10 }}>
      <h1>Welcome, {myData.name}</h1>
      <Col span={20}>
        {usersList.length === 0 ? (
          <div style={{ textAlign: 'center' }}>No user to show</div>
        ) : (
          ''
        )}
        {usersList.map((user) => (
          <div key={user.id} onClick={() => onSelectUser(user.id)}>
            <UserCard
              user={user}
              selectedUserId={selectedUserId}
              messagesCount={unSeenMessagesCount[user.id]}
            />
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default UsersList;
