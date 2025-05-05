import React from 'react';

interface HeaderProps {
  institutionName: string;
  textColor: string;
}

const Header: React.FC<HeaderProps> = ({ institutionName, textColor }) => {
  return (
    <header className={`text-center ${textColor}`}>
      <h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2" 
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {institutionName}
      </h1>
      <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
    </header>
  );
};

export default Header;
