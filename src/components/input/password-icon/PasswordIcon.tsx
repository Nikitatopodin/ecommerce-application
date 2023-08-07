import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function PasswordIcon() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  return isPasswordVisible ? (
    <EyeTwoTone onClick={() => setPasswordVisible(true)} />
  ) : (
    <EyeInvisibleOutlined onClick={() => setPasswordVisible(false)} />
  );
}

export default PasswordIcon;
