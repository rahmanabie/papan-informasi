import React from 'react';

interface HeaderProps {
  institutionName: string;
  textColor: string;
  headerFontSize: string;
  headerFontFamily?: string;
  headerFontWeight?: string;
  headerTextColor?: string;
  logoUrl?: string;
  showLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  institutionName, 
  textColor, 
  headerFontSize,
  headerFontFamily = 'Montserrat, sans-serif',
  headerFontWeight = 'bold',
  headerTextColor,
  logoUrl = '',
  showLogo = false
}) => {
  return (
    <header className={`${textColor} flex items-center`}>
      {showLogo && logoUrl && (
        <div className="mr-4 flex-shrink-0">
          <img 
            src={logoUrl} 
            alt="Logo Instansi" 
            className="h-16 md:h-20 lg:h-24 object-contain"
          />
        </div>
      )}
      <div className="flex-1">
        <h1 
          className={`${headerFontSize} md:text-5xl lg:text-6xl mb-2 text-left ${headerTextColor || textColor}`} 
          style={{ 
            fontFamily: headerFontFamily,
            fontWeight: headerFontWeight
          }}
        >
          {institutionName}
        </h1>
        <div className="w-24 h-1 bg-white/50 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
