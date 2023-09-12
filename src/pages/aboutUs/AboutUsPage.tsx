import React from 'react';
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
    <div className={styles.aboutUs}>
      {aboutUsInfo.map((person) => (
        <PersonCard
          key={person.id}
          name={person.name}
          title={person.title}
          picture={person.picture}
        />
      ))}
    </div>
  );
}

export default AboutUsPage;
