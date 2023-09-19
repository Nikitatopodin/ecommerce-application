import React from 'react';
import { Row } from 'antd';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import PersonCard from './personCard/PersonCard';
import styles from './AboutUsPage.module.css';
import mashaPicture from '../../assets/images/aboutUsPhotos/IMG_9893.jpg';
import ilyaPicture from '../../assets/images/aboutUsPhotos/IMG_9892.jpg';
import nikitaPicture from '../../assets/images/aboutUsPhotos/IMG_9907.jpg';

function AboutUsPage() {
  const aboutUsInfo = [
    {
      id: 1,
      name: 'Maria Bogdanova',
      role: 'Frontend developer, team lead',
      about:
        'Russian emigrant in Poland, who used to work as a children neuropsychologist. ' +
        "Now she's studying Frontend development and hopes to find her dream job. " +
        'Organized team work processes and code review, implemented profile, log in, about us and home page.',
      githubLink: 'https://github.com/ilyakhokhanov',
      picture: mashaPicture,
    },
    {
      id: 2,
      name: 'Ilya Khokhanov',
      role: 'Frontend developer, content manager',
      about:
        'Frontend developer from Yaroslavl. Started studying frontend in February 2022. ' +
        'Idea of the project was submitted by his wife, who is the postcards designer. ' +
        'Implemented catalog and registration page, configured cards photos, descriptions and categories.',
      githubLink: 'https://github.com/ilyakhokhanov',
      picture: ilyaPicture,
    },
    {
      id: 3,
      name: 'Nikita Bykovsky',
      role: 'Frontend developer, problem solving manager',
      about:
        'Former translator who is trying his best at studying Frontend development. ' +
        'May be at some point he will become a Fullstack developer. ' +
        'Installed main project packages, implemented base layout and product page, made tests and configured deployment.',
      githubLink: 'https://github.com/Nikitatopodin',
      picture: nikitaPicture,
    },
  ];

  return (
    <>
      <Row className={styles.aboutUsInfo}>
        <Title level={2} style={{ marginTop: 0 }}>
          About Us
        </Title>
        <Text>
          Welcome to In Memories online store! Our online platform seamlessly
          brings the charm of boutique paper shops to the digital realm. The
          system boasts a user-friendly interface, guiding customers
          effortlessly from browsing to checkout, fostering a sense of
          connection and reliability. Customers can explore in-depth product
          details and effortlessly add chosen items to their cart. For a
          smoother experience, we provide registration and login features,
          advanced search functionalities, as well as intuitive categorization
          and sorting options.
        </Text>
        <Row style={{ marginTop: '.5em' }}>
          <Text>
            The website was created during the{' '}
            <a href="https://rs.school/">RSS JS/Frontend course</a> using the
            React framework with Redux and the Ant Design library.
          </Text>
        </Row>
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
