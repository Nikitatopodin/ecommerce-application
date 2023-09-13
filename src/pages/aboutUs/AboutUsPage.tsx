import React from 'react';
import { Row } from 'antd';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import PersonCard from './personCard/PersonCard';
import styles from './AboutUsPage.module.css';
import mashaPicture from '../../assets/images/mashabogdanova.jpg';

function AboutUsPage() {
  const aboutUsInfo = [
    {
      id: 1,
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: mashaPicture,
    },
    {
      id: 2,
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: mashaPicture,
    },
    {
      id: 3,
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: mashaPicture,
    },
  ];

  return (
    <>
      <Row style={{ padding: '2em 4em 0' }}>
        <Title level={2} style={{ marginTop: 0 }}>
          About Us
        </Title>
        <Text>
          The online store In Memories offers stunning designer greeting cards
          for any occasion. The website was implemented using the React
          framework with Redux and the Ant Design library. To organize our work,
          we used the Jira task scheduler.
        </Text>
      </Row>
      <div className={styles.personCards}>
        {aboutUsInfo.map((person) => (
          <PersonCard
            key={person.id}
            name={person.name}
            title={person.title}
            picture={person.picture}
          />
        ))}
      </div>
      <Row className={styles.RSSInfo}>
        <a href="https://rs.school/">
          <img
            src="https://rs.school/images/rs_school.svg"
            alt="RS School logo"
            className={styles.RSSLogo}
          />
          <Row>
            <Text type="secondary">
              The website was created during <br /> the RSS JS/Frontend course
            </Text>
          </Row>
        </a>
      </Row>
    </>
  );
}

export default AboutUsPage;
