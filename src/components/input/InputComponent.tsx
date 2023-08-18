import React, { FormEvent } from 'react';
import { Input } from 'antd';
import PasswordIcon from './password-icon/PasswordIcon';

interface IProps {
  placeholder: string;
  isPasswordType: boolean;
  status?: '' | 'warning' | 'error' | undefined;
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

InputComponent.defaultProps = {
  status: undefined,
};

export default InputComponent;
