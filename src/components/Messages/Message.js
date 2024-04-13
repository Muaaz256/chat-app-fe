import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

/**
 * @param {Object} props - props of the component
 * @param {String} props.message - user data
 * @param {Boolean} props.isReceived - user data
 * @param {string} props.time - user data
 * @return {JSX.Element}
 * */
const Message = ({ message, isReceived, time }) => {
  const messageTime = moment(time).format('LLL');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isReceived ? 'row' : 'row-reverse',
        justifyContent: isReceived ? 'start' : 'end',
        gap: 10,
        width: '100%'
      }}
    >
      <Avatar icon={<UserOutlined />} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '60%',
          gap: 5
        }}
      >
        <div
          style={{
            backgroundColor: isReceived ? '#fff' : '#c5bfeb',
            padding: 10,
            borderRadius: isReceived
              ? '0px 10px 10px 10px'
              : '10px 0px 10px 10px',
            border: isReceived ? '1px solid #00000024' : 'none'
          }}
        >
          {message}
        </div>
        <div style={{ alignSelf: 'end', color: '#0000004d' }}>
          {messageTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
