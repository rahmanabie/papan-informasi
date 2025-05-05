import React, { useEffect, useState } from 'react';

interface RunningTextWidgetProps {
  textColor?: string;
  bgColor?: string;
  scrollSpeed?: number;
  direction?: 'left' | 'right';
  texts?: string[];
  dateBgColor?: string;
  timeBgColor?: string;
  enabled?: boolean;
  fontSize?: string;
  fontFamily?: string;
}

const RunningTextWidget: React.FC<RunningTextWidgetProps> = ({
  textColor = '#050000',
  bgColor = '#FFFFFF',
  scrollSpeed = 90,
  direction = 'left',
  texts = [
    'Imran Tolatoly |',
    'Teks berjalan atau running text adalah elemen desain web atau media lainnya di mana teks bergerak secara horizontal atau vertikal di layar. Teks ini sering kali digunakan untuk menampilkan informasi yang ingin ditonjolkan, seperti pengumuman, peringatan,',
    '[Semangat Pagi, dan Jangan lupa berdoa]    |'
  ],
  dateBgColor = '#49AD21',
  timeBgColor = '#FFFC36',
  enabled = true,
  fontSize = '1.25rem',
  fontFamily = 'Arial, sans-serif'
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    // Format date as "Senin, 05 Mei 2025"
    const updateDate = () => {
      const now = new Date();
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      
      const day = days[now.getDay()];
      const date = now.getDate().toString().padStart(2, '0');
      const month = months[now.getMonth()];
      const year = now.getFullYear();
      
      setCurrentDate(`${day}, ${date} ${month} ${year}`);
    };

    updateTime();
    updateDate();
    
    const timer = setInterval(updateTime, 200);
    return () => clearInterval(timer);
  }, []);

  // Kecepatan scroll untuk marquee
  const getScrollAmount = () => {
    switch(scrollSpeed) {
      case 30: return 1;  // Sangat Cepat
      case 60: return 2;  // Cepat
      case 90: return 3;  // Sedang
      case 120: return 4; // Lambat
      case 150: return 5; // Sangat Lambat
      default: return Math.max(1, Math.ceil(scrollSpeed / 30));
    }
  };
  
  // Delay scroll untuk marquee
  const getScrollDelay = () => {
    return scrollSpeed;
  };

  // Jika komponen dinonaktifkan, tidak menampilkan apa-apa
  if (!enabled) return null;
  
  // Pastikan texts adalah array yang valid dan memproses teks dengan benar
  const validTexts = Array.isArray(texts) && texts.length > 0 && texts.some(t => t.trim() !== '') 
    ? texts.filter(t => t.trim() !== '') 
    : ['Teks berjalan belum diatur. Silakan tambahkan teks di pengaturan.'];
  
  return (
    <tr style={{ textAlign: 'center', verticalAlign: 'middle' }}>
      <td style={{ backgroundColor: dateBgColor, width: '271px' }}>
        <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#000000', fontSize: '1.5rem' }}>{currentDate}</span>
      </td>
      <td style={{ 
        width: '745px', 
        textAlign: 'center', 
        verticalAlign: 'middle', 
        paddingLeft: '20px', 
        paddingRight: '20px', 
        backgroundSize: '1000px',
        backgroundColor: bgColor
      }}>
        {/* 
          Menggunakan tag marquee dengan ts-ignore karena meskipun sudah deprecated,
          tag ini masih didukung oleh browser dan merupakan cara paling sederhana
          untuk membuat teks berjalan
        */}
        {/* @ts-ignore */}
        <marquee 
          direction={direction} 
          scrollAmount={getScrollAmount()} 
          scrolldelay={getScrollDelay()}
          behavior="scroll"
        >
          <div id="runteks">
            {validTexts.map((text, index) => (
              <React.Fragment key={index}>
                &nbsp;&nbsp;&nbsp;<span style={{ color: textColor, fontSize, fontFamily }} className="jajal">{text}</span>&nbsp;&nbsp;&nbsp;
              </React.Fragment>
            ))}
          </div>
        </marquee>
      </td>
      <td style={{ width: '95px', textAlign: 'center', backgroundColor: timeBgColor }}>
        <div id="timehere" style={{ fontSize: '25px', color: '#000000' }}>{currentTime}</div>
      </td>
    </tr>
  );
};

export default RunningTextWidget;
