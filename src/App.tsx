import React from 'react';
import './App.css';
import ButtonComponent from './components/button/ButtonComponent';

function App() {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
  };

  return (
    <ButtonComponent
      type={undefined}
      title="sdf"
      isDisabled={false}
      onClick={onClickHandler}
    />
  );
}

export default App;
