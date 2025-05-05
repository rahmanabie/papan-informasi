import React, { useState, useEffect } from 'react';

interface DateTimeDisplayProps {
  textColor: string;
  dateTimeFormat: string;
}

const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ textColor, dateTimeFormat }) => {
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
    if (dateTimeFormat === 'short') {
      const day = currentTime.getDate().toString().padStart(2, '0');
      const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
      const year = currentTime.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ];
      const day = currentTime.getDate();
      const month = months[currentTime.getMonth()];
      const year = currentTime.getFullYear();
      return `${day} ${month} ${year}`;
    }
  };

  const formatTime = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const renderDateTime = () => {
    if (dateTimeFormat === 'short') {
      return (
        <>
          <div className="text-sm font-semibold">{formatDate()}</div>
          <div className="text-xl font-bold">{formatTime()}</div>
        </>
      );
    } else if (dateTimeFormat === 'long') {
      return (
        <div className="flex flex-col items-end">
          <div className="text-xs">{formatDay()}</div>
          <div className="text-sm font-semibold">{formatDate()}</div>
          <div className="text-xl font-bold">{formatTime()} WIB</div>
        </div>
      );
    } else {
      // default format
      return (
        <div className="flex flex-col items-end">
          <div className="text-xs">{formatDay()}</div>
          <div className="text-sm font-semibold">{formatDate()}</div>
          <div className="text-xl font-bold">{formatTime()}</div>
        </div>
      );
    }
  };

  return (
    <div className={`${textColor}`}>
      <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
        {renderDateTime()}
      </div>
    </div>
  );
};

export default DateTimeDisplay;
