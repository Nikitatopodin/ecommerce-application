import React from 'react';
import PersonCard from './PersonCard';

function AboutUsPage() {
  const aboutUsInfo = [
    {
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: '../../assets/images/mashabogdanova.jpg',
    },
    {
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: '../../assets/images/mashabogdanova.jpg',
    },
    {
      name: 'Maria Bogdanova',
      title: 'Team lead',
      picture: '../../assets/images/mashabogdanova.jpg',
    },
  ];

  aboutUsInfo.map((person) => (
    <PersonCard
      name={person.name}
      title={person.title}
      picture={person.picture}
    />
  ));

  return <div></div>;
}

export default AboutUsPage;
