import React from 'react';

interface HeaderProps {
  institutionName: string;
  textColor: string;
  headerFontSize: string;
  headerFontFamily?: string;
  headerFontWeight?: string;
  headerTextColor?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  institutionName, 
  textColor, 
  headerFontSize,
  headerFontFamily = 'Montserrat, sans-serif',
  headerFontWeight = 'bold',
  headerTextColor
}) => {
  return (
    <header className={`text-center ${textColor}`}>
      <h1 
        className={`${headerFontSize} md:text-5xl lg:text-6xl mb-2 ${headerTextColor || textColor}`} 
        style={{ 
          fontFamily: headerFontFamily,
          fontWeight: headerFontWeight
        }}
      >
        {institutionName}
      </h1>
      <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
    </header>
  );
};

export default Header;
