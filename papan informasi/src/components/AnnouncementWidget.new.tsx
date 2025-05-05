import React, { useState, useEffect } from 'react';
import { Calendar, Edit, Trash2, Plus, X, Save } from 'lucide-react';

interface AnnouncementWidgetProps {
  showControls?: boolean;
  title?: string;
  fontSize?: string;
  scrollSpeed?: number;
  scrollDirection?: 'up' | 'down';
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  enableEditing?: boolean;
}

interface Announcement {
  id: number;
  day: string;
  time: string;
  title: string;
  location: string;
  notes: string;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

const defaultAnnouncements: Announcement[] = [
  {
    id: 1,
    day: 'JUMAT',
    time: '14.00 WIB s.d Selesai',
    title: 'Buka Puasa Bersama, Santunan Yatim & Dhu\'afa dan Pembagian Takjil Berbuka Puasa',
    location: 'Kantor Kementerian Agama Kota Tangerang Selatan',
    notes: '',
    status: 'upcoming'
  },
  {
    id: 2,
    day: 'SENIN',
    time: '09.00 WIB s.d 12.00 WIB',
    title: 'Rapat Koordinasi Bulanan',
    location: 'Ruang Rapat Utama Lt. 3',
    notes: 'Wajib dihadiri oleh seluruh kepala bagian',
    status: 'upcoming'
  }
];

const AnnouncementWidget: React.FC<AnnouncementWidgetProps> = ({
  showControls = false,
  title = 'Agenda Kegiatan',
  fontSize = 'text-base',
  scrollSpeed = 2,
  scrollDirection = 'up',
  bgColor = 'bg-white',
  textColor = 'text-gray-800',
  borderColor = 'ring-green-500',
  enableEditing = false
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const savedAnnouncements = localStorage.getItem('infoboard-announcements');
    return savedAnnouncements ? JSON.parse(savedAnnouncements) : defaultAnnouncements;
  });
  
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<number | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  // Form for new/editing announcement
  const [formData, setFormData] = useState<Omit<Announcement, 'id'>>({  
    day: 'SENIN',
    time: '08:00 WIB',
    title: '',
    location: '',
    notes: '',
    status: 'upcoming'
  });
  
  const daysOfWeek = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU'];
  const statusOptions = [
    { value: 'upcoming', label: 'Akan Datang', color: 'blue' },
    { value: 'ongoing', label: 'Sedang Berlangsung', color: 'green' },
    { value: 'completed', label: 'Selesai', color: 'gray' },
    { value: 'cancelled', label: 'Dibatalkan', color: 'red' }
  ];

  // Calculate scroll delay based on speed
  const getScrollDelay = () => {
    switch(scrollSpeed) {
      case 1: return 200; // Slow
      case 2: return 120; // Medium
      case 3: return 80;  // Fast
      case 4: return 40;  // Very fast
      default: return 120;
    }
  };

  useEffect(() => {
    localStorage.setItem('infoboard-announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleEditClick = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      day: announcement.day,
      time: announcement.time,
      title: announcement.title,
      location: announcement.location,
      notes: announcement.notes || '',
      status: announcement.status || 'upcoming'
    });
    setShowEditForm(true);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingAnnouncement(null);
    setFormData({
      day: 'SENIN',
      time: '08:00 WIB',
      title: '',
      location: '',
      notes: '',
      status: 'upcoming'
    });
    setShowEditForm(true);
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    setSelectedAnnouncementId(null);
    setEditingAnnouncement(null);
    setShowEditForm(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAnnouncement = () => {
    if (isAddingNew) {
      // Add new announcement
      const newId = Math.max(0, ...announcements.map(a => a.id)) + 1;
      setAnnouncements(prev => [...prev, { id: newId, ...formData }]);
    } else if (editingAnnouncement) {
      // Update existing announcement
      setAnnouncements(prev => 
        prev.map(a => a.id === editingAnnouncement.id ? { ...a, ...formData } : a)
      );
    }
    
    setShowEditForm(false);
    setIsAddingNew(false);
    setEditingAnnouncement(null);
  };

  const getStatusColor = (status?: string) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch(status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Sedang Berlangsung';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return 'Akan Datang';
    }
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden h-full flex flex-col ${fontSize} ${bgColor} ${textColor} ring-2 ${borderColor}`}>
      {/* Header */}
      <div className="p-2 flex justify-between items-center bg-teal-500 text-white">
        <div className="font-bold text-center flex-1">{title}</div>
        {enableEditing && (
          <button 
            onClick={handleAddNew}
            className="p-1 bg-white text-teal-600 rounded-full hover:bg-teal-100"
          >
            <Plus size={18} />
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {showEditForm ? (
          <div className="p-4 h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">
                {isAddingNew ? 'Tambah Agenda Baru' : 'Edit Agenda'}
              </h3>
              <button 
                onClick={() => {
                  setShowEditForm(false);
                  setIsAddingNew(false);
                  setEditingAnnouncement(null);
                }}
                className="p-1 bg-gray-200 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Hari</label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Jam</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="08:00 WIB s.d Selesai"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Judul</label>
                <textarea
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Judul agenda"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Lokasi</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Lokasi agenda"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Keterangan</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Keterangan tambahan (opsional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleSaveAnnouncement}
                  className="px-4 py-2 bg-teal-500 text-white rounded-md flex items-center"
                >
                  <Save size={16} className="mr-1" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <marquee 
              direction={scrollDirection} 
              scrolldelay={getScrollDelay().toString()} 
              className="h-full"
              behavior="scroll"
            >
              <div className="p-2">
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id}
                    className={`mb-4 relative ${selectedAnnouncementId === announcement.id ? 'ring-1 ring-teal-500' : ''}`}
                  >
                    {enableEditing && (
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button 
                          onClick={() => handleEditClick(announcement)}
                          className="p-1 bg-blue-100 rounded-full"
                        >
                          <Edit size={14} className="text-blue-600" />
                        </button>
                        <button 
                          onClick={() => handleDeleteAnnouncement(announcement.id)}
                          className="p-1 bg-red-100 rounded-full"
                        >
                          <Trash2 size={14} className="text-red-600" />
                        </button>
                      </div>
                    )}
                    
                    <table 
                      style={{fontSize: fontSize === 'text-xs' ? '14px' : fontSize === 'text-sm' ? '16px' : '20px', wordWrap: 'break-word'}} 
                      cellPadding="5" 
                      cellSpacing="5"
                      className="w-full border-collapse"
                    >
                      <tbody>
                        <tr>
                          <td colSpan={3} align="center" valign="middle">
                            <Calendar className="inline-block mr-2 w-5 h-5" />
                            <b>{announcement.day}</b>
                            {announcement.status && (
                              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getStatusColor(announcement.status)}`}>
                                {getStatusLabel(announcement.status)}
                              </span>
                            )}
                          </td>
                        </tr>
                        <tr height="50">
                          <td width="18%" valign="top"><b>Jam</b></td>
                          <td width="3%" valign="top">:</td>
                          <td width="79%" valign="top">{announcement.time}</td>
                        </tr>
                        <tr height="50">
                          <td valign="top" className="bg-gray-200"><b>Judul</b></td>
                          <td valign="top" className="bg-gray-200">:</td>
                          <td valign="top" className="bg-gray-200" style={{wordWrap: 'break-word'}}>
                            {announcement.title}
                          </td>
                        </tr>
                        <tr height="50">
                          <td valign="top"><b>Lokasi</b></td>
                          <td valign="top">:</td>
                          <td valign="top" style={{wordWrap: 'break-word'}}>{announcement.location}</td>
                        </tr>
                        {announcement.notes && (
                          <tr height="50">
                            <td valign="top" className="bg-gray-200"><b>Keterangan</b></td>
                            <td valign="top" className="bg-gray-200">:</td>
                            <td valign="top" className="bg-gray-200" style={{wordWrap: 'break-word'}}>
                              {announcement.notes}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </marquee>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementWidget;
