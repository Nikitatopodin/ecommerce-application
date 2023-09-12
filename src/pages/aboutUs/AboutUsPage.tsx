import React from 'react';
import PersonCard from './PersonCard';

function AboutUsPage() {
  const aboutUsInfo = [
    {
      id: 1,
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: '../../assets/images/mashabogdanova.jpg',
    },
    {
      id: 2,
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: '../../assets/images/mashabogdanova.jpg',
    },
    {
      id: 3,
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: '../../assets/images/mashabogdanova.jpg',
    },
  ];

  return (
    <>
      {aboutUsInfo.map((person) => (
        <PersonCard
          key={person.id}
          name={person.name}
          title={person.title}
          picture={person.picture}
        />
      ))}
    </>
  );
}

export default AboutUsPage;
