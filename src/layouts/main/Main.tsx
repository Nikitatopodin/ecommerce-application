import React from 'react';
import { Layout, Typography } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const mainStyle: React.CSSProperties = {
  color: '#000',
  padding: '10vh',
  lineHeight: '40px',
  backgroundColor: '#f5f5f5',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontWeight: 400,
  fontSize: '2.5vw',
};

// interface IMainProps {
//   children?: React.ReactNode;
// }

export default function MainComponent() {
  // const { children } = props;

  return (
    <Content style={mainStyle}>
      <Typography>
        <Title style={titleStyle}>
          POSTCARDS THAT WILL INCREASE YOUR AVERAGE CHECK <br />
          AND WILL BE REMEMBERED BY YOUR CLIENTS
        </Title>
      </Typography>
      {/* {children} */}
    </Content>
  );
}
