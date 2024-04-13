import React, { useContext, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { SendOutlined } from '@ant-design/icons';
import { ChatContext } from '../../contexts/chatContext';
import moment from 'moment';

const MessageInput = () => {
  const [form] = Form.useForm();
  const { sendMessage } = useContext(ChatContext);

  const checkFormSubmission = () => {
    const messageValue = form.getFieldValue('message');
    if (!messageValue.trim()) return;
    form.submit();
  };

  const onSendMessage = (data) => {
    const message = data.message.trim();
    const time = moment().format();
    sendMessage({
      message,
      time
    });
    form.setFieldValue('message', '');
    document.getElementById('messageTextArea').focus();
  };

  const onTextAreaKeyPress = (e) => {
    if (e.charCode === 13 && !e.shiftKey) {
      e.preventDefault();
      checkFormSubmission();
    }
  };

  useEffect(() => {
    document.getElementById('messageTextArea').focus();
  }, []);

  return (
    <Form
      initialValues={{ message: '' }}
      form={form}
      layout="inline"
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
      }}
      onFinish={onSendMessage}
    >
      <Form.Item name="message" style={{ width: '80%' }}>
        <Input.TextArea
          placeholder="Type your message here..."
          id="messageTextArea"
          autoSize={{
            minRows: 1,
            maxRows: 2
          }}
          onKeyPress={onTextAreaKeyPress}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          icon={<SendOutlined />}
          shape="round"
          style={{ backgroundColor: '#c5bfeb' }}
          onClick={checkFormSubmission}
        />
      </Form.Item>
    </Form>
  );
};

export default React.memo(MessageInput);
