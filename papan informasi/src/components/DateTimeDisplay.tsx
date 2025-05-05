import React, { useState, useEffect } from 'react';

interface DateTimeDisplayProps {
  textColor: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ textColor }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDay = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[currentTime.getDay()];
  };

  const formatDate = () => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={`text-center ${textColor}`}>
      <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
        <div className="text-xl">{formatDay()}</div>
        <div className="text-2xl font-semibold">{formatDate()}</div>
        <div className="text-4xl font-bold mt-2">{formatTime()}</div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
