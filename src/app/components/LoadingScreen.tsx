import Image from 'next/image';
import React from 'react';
import logo from '../../../public/assets/images/generic-logo.png';

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen absolute ">
      <Image src={logo} alt="logo" height={400} width={400} />
      <span className="loading loading-ring loading-lg block"></span>
    </div>
  );
};

export default LoadingScreen;
