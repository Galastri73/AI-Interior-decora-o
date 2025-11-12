
import React from 'react';
import { Tab } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import MagicWandIcon from './icons/MagicWandIcon';

interface TabSelectorProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ isActive, onClick, icon, label }) => {
  const baseClasses = "flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";
  const activeClasses = "bg-indigo-600 text-white shadow-md";
  const inactiveClasses = "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600";
  const ringClasses = "focus:ring-indigo-500";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${ringClasses}`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
};

const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="max-w-md mx-auto p-1.5 bg-gray-200 dark:bg-gray-800 rounded-xl grid grid-cols-2 gap-2">
      <TabButton
        isActive={activeTab === Tab.RoomRedesign}
        onClick={() => setActiveTab(Tab.RoomRedesign)}
        icon={<SparklesIcon className="w-5 h-5" />}
        label="Room Redesign"
      />
      <TabButton
        isActive={activeTab === Tab.ImageEditor}
        onClick={() => setActiveTab(Tab.ImageEditor)}
        icon={<MagicWandIcon className="w-5 h-5" />}
        label="Image Editor"
      />
    </div>
  );
};

export default TabSelector;
