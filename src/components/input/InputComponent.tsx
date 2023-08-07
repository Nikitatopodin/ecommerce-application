import React, { FormEvent } from 'react';
import { Input } from 'antd';
import PasswordIcon from './password-icon/PasswordIcon';

interface IProps {
  status: '' | 'warning' | 'error' | undefined;
  placeholder: string;
  isPasswordType: boolean;
  onInput: (e: FormEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLElement>) => void;
}

function InputComponent({ isPasswordType, ...props }: IProps) {
  return isPasswordType ? (
    <Input.Password {...props} iconRender={PasswordIcon} />
  ) : (
    <Input {...props} />
  );
}

export default InputComponent;
