import React from 'react';
import { Avatar, Badge, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import classes from './UsersList.module.css';

/**
 * @param {Object} props - props of the component
 * @param {Object} props.user - user data
 * @param {String} props.selectedUserId - user data
 * @param {Number} props.unSeenMessagesCount - user data
 * @return {JSX.Element}
 * */
const UserCard = ({ user, selectedUserId, unSeenMessagesCount }) => {
  return (
    <Row
      align="middle"
      className={
        classes['user-card'] +
        (selectedUserId === user.id ? ' ' + classes['selected-user-card'] : '')
      }
    >
      <Badge count={unSeenMessagesCount} showZero={false}>
        <Avatar
          size={50}
          icon={<UserOutlined />}
          style={{ marginRight: 10 }}
          shape="square"
        />
      </Badge>
      <div style={{ fontSize: 25 }}>{user.name}</div>
    </Row>
  );
};

const areUsersSame = (oldProps, newProps) => {
  if (oldProps.selectedUserId !== newProps.selectedUserId) return false;
  if (oldProps.unSeenMessagesCount !== newProps.unSeenMessagesCount)
    return false;
  return oldProps.user.id === newProps.user.id;
};

export default React.memo(UserCard, areUsersSame);
