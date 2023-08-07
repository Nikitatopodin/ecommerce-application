import React, { MouseEventHandler, ReactElement } from 'react';
import { Button } from 'antd';

interface IProps {
  type: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined;
  title: string;
  isDisabled: boolean;
  onClick: MouseEventHandler<HTMLElement>;
}

function ButtonComponent({ title, ...props }: IProps): ReactElement {
  return <Button {...props}>{title}</Button>;
}

export default ButtonComponent;
