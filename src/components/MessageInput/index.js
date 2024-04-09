import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';

import { SendOutlined } from '@ant-design/icons';

const MessageInput = () => {
  const [form] = Form.useForm();

  const checkFormSubmission = () => {
    const messageValue = form.getFieldValue('message');
    if (!messageValue.trim()) return;
    form.submit();
  };

  const onSendMessage = (data) => {
    const message = data.message.trim();
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
          onClick={checkFormSubmission}
        />
      </Form.Item>
    </Form>
  );
};

export default React.memo(MessageInput);
