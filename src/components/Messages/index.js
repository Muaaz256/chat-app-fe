import { Flex } from 'antd';
import Message from './Message';
import classes from './Messages.module.css';

/**
 * @param {Object} props - props of the component
 * @param {Object[]} props.messages - user data
 * @return {JSX.Element}
 * */
const Messages = ({ messages }) => {
  return (
    <Flex className={classes['messages-container']} vertical>
      <Message message="hello" isReceived />
      <Message message="world" />
    </Flex>
  );
};

export default Messages;
