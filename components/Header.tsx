
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <SparklesIcon className="w-8 h-8 text-indigo-500 mr-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          AI Interior Designer & Image Editor
        </h1>
      </div>
    </header>
  );
};

export default Header;
