import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>© {currentYear} Feedback Collection System | Made with ❤️ using React</p>
    </footer>
  );
};

export default Footer;

