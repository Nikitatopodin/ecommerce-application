import React from 'react';
import './App.css';
import ButtonComponent from './components/button/ButtonComponent';
import InputComponent from './components/input/InputComponent';

function App() {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);
  };

  return (
    <>
      <ButtonComponent
        type={undefined}
        title="sdf"
        isDisabled={false}
        onClick={onClickHandler}
      />
      <InputComponent
        status=""
        placeholder="sdf"
        isPasswordType
        onInput={() => console.log('Input')}
        onBlur={() => console.log('Blur')}
      />
    </>
  );
}

export default App;
