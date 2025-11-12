
import React, { useState } from 'react';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import RoomRedesign from './components/RoomRedesign';
import ImageEditor from './components/ImageEditor';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.RoomRedesign);

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-8">
          {activeTab === Tab.RoomRedesign && <RoomRedesign />}
          {activeTab === Tab.ImageEditor && <ImageEditor />}
        </div>
      </main>
    </div>
  );
};

export default App;
