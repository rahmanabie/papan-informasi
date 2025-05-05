import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import DateTimeDisplay from './components/DateTimeDisplay';
import VideoWidget from './components/VideoWidget';
import PhotoWidget from './components/PhotoWidget';
import Footer from './components/Footer';
import SettingsPanel from './components/SettingsPanel';
import { Settings } from './types';
import { Settings as SettingsIcon } from 'lucide-react';

export function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('infoboard-settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      institutionName: 'Nama Instansi',
      footerText: '© 2023 Papan Informasi. Hak Cipta Dilindungi.',
      bgColor: 'bg-gradient-to-br from-blue-400 to-purple-500',
      textColor: 'text-white'
    };
  });

  useEffect(() => {
    localStorage.setItem('infoboard-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className={`min-h-screen ${settings.bgColor} transition-all duration-500 flex flex-col`} 
      style={{ fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Settings Toggle Button */}
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className="fixed top-4 right-4 z-50 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle Settings"
      >
        <SettingsIcon className="text-gray-700 w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-6">
        <Header institutionName={settings.institutionName} textColor={settings.textColor} />
        <DateTimeDisplay textColor={settings.textColor} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          <VideoWidget />
          <PhotoWidget />
        </div>
      </div>

      <Footer text={settings.footerText} textColor={settings.textColor} />
      
      {showSettings && (
        <SettingsPanel 
          settings={settings} 
          setSettings={setSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}
    </div>
  );
}

export default App;
