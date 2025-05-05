import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, Calendar, Edit, X, Save, Trash, Copy } from 'lucide-react';

interface AnnouncementWidgetProps {
  showControls?: boolean;
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

const AnnouncementWidget: React.FC<AnnouncementWidgetProps> = ({ showControls }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const savedAnnouncements = localStorage.getItem('infoboard-announcements');
    return savedAnnouncements ? JSON.parse(savedAnnouncements) : defaultAnnouncements;
  });
  
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<number | null>(null);
  const [quickEditAnnouncement, setQuickEditAnnouncement] = useState<Announcement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // For auto-scrolling effect
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        const scrollHeight = scrollRef.current.scrollHeight;
        const currentScroll = scrollRef.current.scrollTop;
        const clientHeight = scrollRef.current.clientHeight;
        
        // If we're at the bottom, go back to top
        if (currentScroll + clientHeight >= scrollHeight - 10) {
          scrollRef.current.scrollTop = 0;
        } else {
          // Otherwise scroll down a bit
          scrollRef.current.scrollTop += 1;
        }
      }
    }, 50);
    
    return () => clearInterval(scrollInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('infoboard-announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    setSelectedAnnouncementId(null);
  };
  
  return (
    <div className="rounded-xl shadow-lg overflow-hidden h-full flex flex-col text-sm">
      <div className="flex-1 relative overflow-hidden">
        <div className="h-full flex flex-col p-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Megaphone className="text-green-500 mr-1.5 w-4 h-4" />
              <h2 className="text-base font-semibold">Agenda Kegiatan</h2>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <div 
              ref={scrollRef}
              className="h-full overflow-y-auto" 
              style={{ scrollBehavior: 'smooth' }}
            >
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id}
                  className={`mb-2 cursor-pointer relative ${selectedAnnouncementId === announcement.id ? 'ring-1 ring-green-500' : ''}`}
                  onClick={() => setSelectedAnnouncementId(announcement.id)}
                >
                  {quickEditAnnouncement && quickEditAnnouncement.id === announcement.id ? (
                    <div className="p-2 border border-blue-500 rounded-lg bg-white shadow-lg">
                      <div className="flex justify-between items-center mb-1.5">
                        <h3 className="font-semibold text-blue-600 text-xs">Edit Cepat</h3>
                        <div className="flex space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Save changes
                              setAnnouncements(announcements.map(a => 
                                a.id === quickEditAnnouncement.id ? quickEditAnnouncement : a
                              ));
                              setQuickEditAnnouncement(null);
                            }}
                            className="bg-green-500 text-white p-0.5 rounded hover:bg-green-600 transition flex items-center text-xs"
                          >
                            <Save className="w-2.5 h-2.5 mr-0.5" /> Simpan
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuickEditAnnouncement(null);
                            }}
                            className="bg-gray-500 text-white p-0.5 rounded hover:bg-gray-600 transition flex items-center text-xs"
                          >
                            <X className="w-2.5 h-2.5 mr-0.5" /> Batal
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700">Hari</label>
                            <input
                              type="text"
                              className="w-full p-1 text-sm border border-gray-300 rounded"
                              value={quickEditAnnouncement.day}
                              onChange={(e) => setQuickEditAnnouncement({...quickEditAnnouncement, day: e.target.value})}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700">Jam</label>
                            <input
                              type="text"
                              className="w-full p-1 text-sm border border-gray-300 rounded"
                              value={quickEditAnnouncement.time}
                              onChange={(e) => setQuickEditAnnouncement({...quickEditAnnouncement, time: e.target.value})}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Judul</label>
                          <textarea
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            value={quickEditAnnouncement.title}
                            onChange={(e) => setQuickEditAnnouncement({...quickEditAnnouncement, title: e.target.value})}
                            rows={2}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Lokasi</label>
                          <input
                            type="text"
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            value={quickEditAnnouncement.location}
                            onChange={(e) => setQuickEditAnnouncement({...quickEditAnnouncement, location: e.target.value})}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700">Keterangan</label>
                          <textarea
                            className="w-full p-1 text-sm border border-gray-300 rounded"
                            value={quickEditAnnouncement.notes}
                            onChange={(e) => setQuickEditAnnouncement({...quickEditAnnouncement, notes: e.target.value})}
                            rows={2}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
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
                        )}
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
