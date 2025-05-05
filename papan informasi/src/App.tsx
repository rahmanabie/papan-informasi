import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import DateTimeDisplay from './components/DateTimeDisplay';
import TVStreamingWidget from './components/TVStreamingWidget';
import AnnouncementWidget from './components/AnnouncementWidget';
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
      footerText: ' 2023 Papan Informasi. Hak Cipta Dilindungi.',
      bgColor: 'bg-gradient-to-br from-blue-400 to-purple-500',
      textColor: 'text-white',
      headerFontSize: 'text-4xl',
      dateTimeFormat: 'default',
      videoTitle: 'Video',
      defaultVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      galleryTitle: 'Galeri Foto',
      autoRotateInterval: 5000,
      showVideoControls: true,
      showGalleryControls: true,
      tvStreamingTitle: 'TV Streaming',
      defaultStreamUrl: 'https://www.youtube.com/watch?v=7aiJ0WrNhaE',
      showTVStreamingControls: true,
      showAnnouncementControls: true
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
      
      {/* Top-right controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
        <div className="mr-2">
          <DateTimeDisplay 
            textColor={settings.textColor} 
            dateTimeFormat={settings.dateTimeFormat} 
          />
        </div>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Toggle Settings"
        >
          <SettingsIcon className="text-gray-700 w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-6">
        <Header 
          institutionName={settings.institutionName} 
          textColor={settings.textColor} 
          headerFontSize={settings.headerFontSize} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
          <div className="md:col-span-3">
            <TVStreamingWidget
              defaultStreamUrl={settings.defaultStreamUrl}
              showControls={settings.showTVStreamingControls}
            />
          </div>
          <div className="md:col-span-1">
            <div className="h-full max-h-[70vh] md:max-h-full">
              <AnnouncementWidget 
                showControls={settings.showAnnouncementControls} 
              />
            </div>
          </div>
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
