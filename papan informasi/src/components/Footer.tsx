import React from 'react';

interface FooterProps {
  text: string;
  textColor: string;
}

const Footer: React.FC<FooterProps> = ({ text, textColor }) => {
  return (
    <footer className={`py-4 text-center ${textColor}`}>
      <p className="bg-black/10 backdrop-blur-sm inline-block px-4 py-2 rounded">
        {text}
      </p>
    </footer>
  );
};

export default Footer;
