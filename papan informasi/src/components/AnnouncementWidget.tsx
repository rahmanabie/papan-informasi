import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, Calendar } from 'lucide-react';

interface AnnouncementWidgetProps {
  showControls?: boolean;
  title?: string;
  fontSize?: string;
  scrollSpeed?: number;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

interface Announcement {
  id: number;
  day: string;
  time: string;
  title: string;
  location: string;
  notes: string;
  color?: string;
  priority?: number;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  participants?: string;
  organizer?: string;
  contactPerson?: string;
  contactNumber?: string;
}

const defaultAnnouncements: Announcement[] = [
  {
    id: 1,
    day: 'SENIN',
    time: '09.00 WIB s.d Selesai',
    title: 'Rapat Koordinasi Bulanan Seluruh Pegawai',
    location: 'Aula Utama Lantai 3',
    notes: 'Harap membawa laporan bulanan masing-masing divisi'
  },
  {
    id: 2,
    day: 'SELASA',
    time: '13.00 WIB s.d 15.00 WIB',
    title: 'Workshop Pengembangan Sistem Informasi',
    location: 'Ruang Pelatihan Komputer',
    notes: 'Peserta diharapkan membawa laptop'
  },
  {
    id: 3,
    day: 'JUMAT',
    time: '14.00 WIB s.d Selesai',
    title: 'Buka Puasa Bersama',
    location: 'Kantor Kementerian Agama',
    notes: ''
  },
  {
    id: 4,
    day: 'KAMIS',
    time: '10.00 WIB s.d 12.00 WIB',
    title: 'Sosialisasi Kebijakan Baru',
    location: 'Ruang Rapat Utama',
    notes: 'Wajib dihadiri oleh seluruh kepala bagian'
  }
];

const AnnouncementWidget: React.FC<AnnouncementWidgetProps> = ({ 
  showControls,
  title = 'Agenda Kegiatan',
  fontSize = 'text-sm',
  scrollSpeed = 2,
  bgColor = 'bg-white',
  textColor = 'text-gray-800',
  borderColor = 'border-green-500'
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const savedAnnouncements = localStorage.getItem('infoboard-announcements');
    return savedAnnouncements ? JSON.parse(savedAnnouncements) : defaultAnnouncements;
  });
  
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // For auto-scrolling effect with marquee style
  useEffect(() => {
    // Only start scrolling if there are announcements
    if (announcements.length === 0) return;

    // Force a layout recalculation to ensure scrollHeight is accurate
    if (scrollRef.current) {
      // Make sure scrolling is enabled
      scrollRef.current.style.overflow = 'auto';
    }
    
    let position = 0;
    
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        const scrollHeight = scrollRef.current.scrollHeight;
        
        // Always scroll upward (content appears to move up)
        const speed = Number(scrollSpeed) || 1;
        position += speed;
        
        // Reset when we've scrolled through the entire content
        if (position >= scrollHeight) {
          position = 0;
        }
        
        // Apply the scroll position
        scrollRef.current.scrollTop = position;
      }
    }, 20);
    
    return () => clearInterval(scrollInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('infoboard-announcements', JSON.stringify(announcements));
  }, [announcements]);

  // Unused but kept for future functionality
  // const handleDeleteAnnouncement = (id: number) => {
  //   setAnnouncements(announcements.filter(a => a.id !== id));
  //   setSelectedAnnouncementId(null);
  // };
  
  return (
    <div className={`rounded-xl shadow-lg overflow-hidden h-full flex flex-col ${fontSize} ${bgColor} ${textColor} ring-2 ${borderColor}`}>
      <div className="flex-1 relative overflow-hidden">
        <div className="h-full flex flex-col p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Megaphone className="text-green-500 mr-1.5 w-4 h-4" />
              <h2 className="text-base font-semibold">{title}</h2>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div 
              ref={scrollRef}
              className="h-full overflow-y-auto" 
              style={{ scrollBehavior: 'auto', overflowX: 'hidden' }}
            >
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id}
                  className={`mb-2 cursor-pointer relative ${selectedAnnouncementId === announcement.id ? 'ring-1 ring-green-500' : ''}`}
                  onClick={() => setSelectedAnnouncementId(announcement.id)}
                >
                  
                    <table 
                      style={{fontSize: '14px', wordWrap: 'break-word'}} 
                      cellPadding="2" 
                      cellSpacing="2"
                      className="w-full border-collapse"
                    >
                      <tbody>
                        <tr>
                          <td colSpan={3} align="center" valign="middle">
                            <Calendar className="inline-block mr-1 w-4 h-4" />
                            <b>{announcement.day}</b>
                          </td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                          <td width="18%" valign="top"><b>Jam</b></td>
                          <td width="3%" valign="top">:</td>
                          <td width="79%" valign="top">{announcement.time}</td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                          <td valign="top" className="bg-gray-200"><b>Judul</b></td>
                          <td valign="top" className="bg-gray-200">:</td>
                          <td valign="top" className="bg-gray-200" style={{wordWrap: 'break-word'}}>
                            {announcement.title}
                          </td>
                        </tr>
                        <tr style={{ height: '30px' }}>
                          <td valign="top"><b>Lokasi</b></td>
                          <td valign="top">:</td>
                          <td valign="top" style={{wordWrap: 'break-word'}}>{announcement.location}</td>
                        </tr>
                        {announcement.notes && (
                          <tr style={{ height: '30px' }}>
                            <td valign="top" className="bg-gray-200"><b>Keterangan</b></td>
                            <td valign="top" className="bg-gray-200">:</td>
                            <td valign="top" className="bg-gray-200" style={{wordWrap: 'break-word'}}>
                              {announcement.notes}
                            </td>
                          </tr>
    
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementWidget;
