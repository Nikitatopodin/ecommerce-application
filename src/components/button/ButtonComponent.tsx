import React, { MouseEventHandler, ReactElement } from 'react';
import { Button } from 'antd';

interface IProps {
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
  title: string;
  htmlType?: 'submit' | 'button' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

function ButtonComponent({ title, ...props }: IProps): ReactElement {
  return <Button {...props}>{title}</Button>;
}

ButtonComponent.defaultProps = {
  htmlType: undefined,
  disabled: false,
  onClick: undefined,
};

export default ButtonComponent;
