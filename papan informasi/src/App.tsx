import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
// DateTimeDisplay telah dihapus
import TVStreamingWidget from './components/TVStreamingWidget';
import AnnouncementWidget from './components/AnnouncementWidget';
import RunningTextWidget from './components/RunningTextWidget';
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
      bgImageUrl: '',
      bgOpacity: 0.7,
      bgBlur: 0,
      useBgImage: false,
      textColor: 'text-white',
      headerFontSize: 'text-4xl',
      headerFontFamily: 'Montserrat, sans-serif',
      headerFontWeight: 'bold',
      headerTextColor: 'text-white',
      logoUrl: '',
      showLogo: false,
      dateTimeFormat: 'default',
      tvStreamingTitle: 'TV Streaming',
      defaultStreamUrl: 'https://www.youtube.com/watch?v=7aiJ0WrNhaE',
      showTVStreamingControls: true,
      showAnnouncementControls: true,
      announcementTitle: 'Agenda Kegiatan',
      announcementFontSize: 'text-sm',
      announcementScrollSpeed: 2,
      announcementScrollDirection: 'up',
      announcementBgColor: 'bg-white',
      announcementTextColor: 'text-gray-800',
      announcementBorderColor: 'border-green-500',
      enableAnnouncementEditing: true,
      // Running Text Widget default settings
      runningTextBgColor: '#FFFFFF',
      runningTextColor: '#050000',
      runningTextScrollSpeed: 90,
      runningTextDirection: 'left',
      runningTextItems: [
        'Imran Tolatoly |',
        'Teks berjalan atau running text adalah elemen desain web atau media lainnya di mana teks bergerak secara horizontal atau vertikal di layar. Teks ini sering kali digunakan untuk menampilkan informasi yang ingin ditonjolkan, seperti pengumuman, peringatan,',
        '[Semangat Pagi, dan Jangan lupa berdoa]    |'
      ],
      enableRunningText: true,
      runningTextDateBgColor: '#49AD21',
      runningTextTimeBgColor: '#FFFC36',
      runningTextFontSize: '1.25rem',
      runningTextFontFamily: 'Arial, sans-serif'
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

  // Membuat style untuk background image jika diaktifkan
  const backgroundStyle: React.CSSProperties = settings.useBgImage && settings.bgImageUrl
    ? {
        fontFamily: 'Poppins, sans-serif',
        backgroundImage: `url(${settings.bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative' as const,
      }
    : { fontFamily: 'Poppins, sans-serif' };

  return (
    <div className={`min-h-screen ${settings.bgColor} transition-all duration-500 flex flex-col relative`} 
      style={backgroundStyle}>
      
      {/* Overlay untuk opacity dan blur jika menggunakan background image */}
      {settings.useBgImage && settings.bgImageUrl && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, ' + settings.bgOpacity + ')',
            backdropFilter: `blur(${settings.bgBlur}px)`,
          }}
        />
      )}
      
      {/* Wrapper untuk konten dengan z-index agar di atas overlay */}
      <div className="relative z-10 flex flex-col flex-1">
      
      {/* Top-right controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
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
          headerFontFamily={settings.headerFontFamily}
          headerFontWeight={settings.headerFontWeight}
          headerTextColor={settings.headerTextColor}
          logoUrl={settings.logoUrl}
          showLogo={settings.showLogo}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
          <div className="md:col-span-3">
            <TVStreamingWidget
              defaultStreamUrl={settings.defaultStreamUrl}
              showControls={settings.showTVStreamingControls}
            />
          </div>
          <div className="md:col-span-2">
            <div className="h-full max-h-[70vh] md:max-h-full">
              <AnnouncementWidget 
                showControls={settings.showAnnouncementControls}
                title={settings.announcementTitle}
                fontSize={settings.announcementFontSize}
                scrollSpeed={settings.announcementScrollSpeed}
                scrollDirection={settings.announcementScrollDirection}
                bgColor={settings.announcementBgColor}
                textColor={settings.announcementTextColor}
                borderColor={settings.announcementBorderColor}
                enableEditing={settings.enableAnnouncementEditing}
              />
            </div>
          </div>
        </div>
      </div>

      <table className="w-full border-collapse mt-4">
        <tbody>
          <RunningTextWidget 
            textColor={settings.runningTextColor}
            bgColor={settings.runningTextBgColor}
            scrollSpeed={settings.runningTextScrollSpeed}
            direction={settings.runningTextDirection}
            texts={settings.runningTextItems}
            dateBgColor={settings.runningTextDateBgColor}
            timeBgColor={settings.runningTextTimeBgColor}
            enabled={settings.enableRunningText}
            fontSize={settings.runningTextFontSize}
            fontFamily={settings.runningTextFontFamily}
          />
        </tbody>
      </table>

      <Footer text={settings.footerText} textColor={settings.textColor} />
      
      {showSettings && (
        <SettingsPanel 
          settings={settings} 
          setSettings={setSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}
      </div>
    </div>
  );
}

export default App;
