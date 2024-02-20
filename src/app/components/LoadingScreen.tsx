import Image from 'next/image';
import React from 'react';
import logo from '../../../public/assets/images/byrs.png';

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-3rem)]">
      <Image src={logo} alt="logo" height={200} width={200} />
      <span className="loading loading-ring loading-lg block"></span>
    </div>
  );
};

export default LoadingScreen;
