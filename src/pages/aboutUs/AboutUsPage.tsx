import React from 'react';
import { Row } from 'antd';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import PersonCard from './personCard/PersonCard';
import styles from './AboutUsPage.module.css';
import mashaPicture from '../../assets/images/IMG_9893.jpg';
import ilyaPicture from '../../assets/images/IMG_9892.jpg';
// import nikitaPicture from '../../assets/images/IMG_9892.jpg';

function AboutUsPage() {
  const aboutUsInfo = [
    {
      id: 1,
      name: 'Maria Bogdanova',
      role: 'Frontend developer, team lead',
      about:
        'I graduated from Moscow State University with a degree in psychology. ' +
        "I used to work as a children's neuropsychologist. Some time ago I moved to Poland " +
        'and started studying front-end development at RS School. After this course I hope ' +
        'to find a job as a Frontend developer.',
      githubLink: 'https://github.com/ilyakhokhanov',
      picture: mashaPicture,
    },
    {
      id: 2,
      name: 'Ilya Khokhanov',
      role: 'Frontend developer, content manager',
      about:
        'Frontend developer Ilya, from Yaroslavl. Started studying frontend in February 2022.' +
        'Stack: JS, TS, React, Redux.\n' +
        'Idea of the project was submitted by my wife, who is the author of postcards.',
      githubLink: 'https://github.com/ilyakhokhanov',
      picture: ilyaPicture,
    },
    {
      id: 3,
      name: 'Maria Bogdanova',
      role: 'Frontend developer, problem solving manager',
      about: 'Team lead',
      githubLink: 'https://github.com/ilyakhokhanov',
      picture: ilyaPicture,
    },
  ];

  return (
    <>
      <Row className={styles.aboutUsInfo}>
        <Title level={2} style={{ marginTop: 0 }}>
          About Us
        </Title>
        <Text>
          The online store In Memories offers stunning designer greeting cards
          for any occasion. The website was created during the RSS JS/Frontend
          course using the React framework with Redux and the Ant Design
          library.
        </Text>
      </Row>
      <div className={styles.personCards}>
        {aboutUsInfo.map((person) => (
          <PersonCard
            key={person.id}
            name={person.name}
            role={person.role}
            about={person.about}
            githubLink={person.githubLink}
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
        </a>
      </Row>
    </>
  );
}

export default AboutUsPage;
