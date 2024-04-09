import { Col, Row } from 'antd';
import classes from './Chat.module.css';
import { MessageBox, UsersList } from '../../components';

const Chat = () => {
  return (
    <Row className={classes['whole-page']}>
      <Col span={6} className={classes['users-list']}>
        <UsersList />
      </Col>
      <Col span={18} className={classes['chat-section']}>
        <MessageBox />
      </Col>
    </Row>
  );
};

export default Chat;
