import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Col, Popover, Row, Typography } from 'antd';
import { useAppSelector } from '../../../hooks/hooks';
import ChangePasswordModal from './changePasswordModal/ChangePasswordModal';
import styles from './ProfileInfo.module.css';

interface IProps {
  setEditMode: (isEditMode: boolean) => void;
}

function ProfileInfo({ setEditMode }: IProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const userData = useAppSelector((state) => state.authorization.userData);
  const { Text, Title } = Typography;

  const popoverContent = (
    <>
      <Text onClick={() => setEditMode(true)} className={styles.profileInfo}>
        Edit profile
      </Text>

      <Text onClick={() => setModalOpen(true)} className={styles.profileInfo}>
        Change password
      </Text>
    </>
  );

  return (
    <Row gutter={20} align="top" data-testid="profileInfo">
      <Col span={20}>
        <Row justify="center">
          <Title style={{ margin: '0.5em' }}>
            {userData?.firstName} {userData?.lastName}
          </Title>
        </Row>
        <Row justify="center">
          <Text>E-mail:&nbsp;</Text>
          <Text type="secondary" italic>
            {userData?.email}
          </Text>
        </Row>
        <Row justify="center">
          <Text>Date of birth:&nbsp;</Text>
          <Text type="secondary" italic>
            {userData?.dateOfBirth}
          </Text>
        </Row>
        {isModalOpen && (
          <ChangePasswordModal
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
          />
        )}
      </Col>
      <Col span={4}>
        <Popover content={popoverContent} arrow={false} placement="bottom">
          <SettingOutlined
            style={{ color: '#bdbdbd', fontSize: 16, marginTop: '2.5em' }}
            onClick={() => {
              setEditMode(true);
            }}
          />
        </Popover>
      </Col>
    </Row>
  );
}

export default ProfileInfo;
