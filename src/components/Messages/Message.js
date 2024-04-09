/**
 * @param {Object} props - props of the component
 * @param {String} props.message - user data
 * @param {Boolean} props.isReceived - user data
 * @param {Date} props.time - user data
 * @param {Object} props.sender - user data
 * @return {JSX.Element}
 * */
const Message = ({ message, isReceived, time, sender }) => {
  return (
    <div style={{ alignSelf: isReceived ? 'start' : 'end' }}>{message}</div>
  );
};

export default Message;
