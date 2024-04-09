import { Row } from 'antd';
import Messages from '../Messages';
import MessageInput from '../MessageInput';

/**
 * @param {Object} props - props of the component
 * @param {Object} props.selectedUser - user data
 * @param {Object[]} props.messages - user data
 * @return {JSX.Element}
 * */
const ChattingArea = ({ selectedUser, messages }) => {
  return (
    <Row style={{ width: '100%', height: '100vh' }}>
      <Row
        style={{ width: '100%', height: '10%', borderBottom: '1px solid gray' }}
        justify="center"
        align="middle"
      >
        <h3>Chat with {selectedUser?.name}</h3>
      </Row>
      <Row style={{ width: '100%', height: '80%' }}>
        <Messages messages={messages} />
      </Row>
      <Row
        style={{ width: '100%', height: '10%', borderTop: '1px solid gray' }}
      >
        <MessageInput />
      </Row>
    </Row>
  );
};

export default ChattingArea;
