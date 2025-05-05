import React, { useState } from 'react';
import { X, Layout, Type, Clock, Tv, Calendar, MessageSquare } from 'lucide-react';
import { Settings } from '../types';

const bgOptions = [
  { value: 'bg-gradient-to-br from-blue-400 to-purple-500', label: 'Blue to Purple' },
  { value: 'bg-gradient-to-br from-green-400 to-blue-500', label: 'Green to Blue' },
  { value: 'bg-gradient-to-br from-pink-400 to-orange-500', label: 'Pink to Orange' },
  { value: 'bg-gradient-to-br from-yellow-400 to-red-500', label: 'Yellow to Red' },
  { value: 'bg-gradient-to-br from-teal-400 to-indigo-500', label: 'Teal to Indigo' },
  { value: 'bg-blue-500', label: 'Solid Blue' },
  { value: 'bg-purple-500', label: 'Solid Purple' },
  { value: 'bg-green-500', label: 'Solid Green' },
  { value: 'bg-pink-500', label: 'Solid Pink' },
];

const textColorOptions = [
  { value: 'text-white', label: 'White' },
  { value: 'text-gray-100', label: 'Light Gray' },
  { value: 'text-yellow-100', label: 'Light Yellow' },
  { value: 'text-blue-100', label: 'Light Blue' },
  { value: 'text-gray-900', label: 'Black' },
];

const fontSizeOptions = [
  { value: 'text-2xl', label: 'Kecil' },
  { value: 'text-3xl', label: 'Sedang' },
  { value: 'text-4xl', label: 'Besar' },
  { value: 'text-5xl', label: 'Sangat Besar' },
];

const announcementFontSizeOptions = [
  { value: 'text-xs', label: 'Sangat Kecil' },
  { value: 'text-sm', label: 'Kecil' },
  { value: 'text-base', label: 'Sedang' },
  { value: 'text-lg', label: 'Besar' },
];

const scrollSpeedOptions = [
  { value: 1, label: 'Lambat' },
  { value: 2, label: 'Sedang' },
  { value: 3, label: 'Cepat' },
  { value: 4, label: 'Sangat Cepat' },
];

const bgColorOptions = [
  { value: 'bg-white', label: 'Putih' },
  { value: 'bg-gray-100', label: 'Abu-abu Terang' },
  { value: 'bg-blue-50', label: 'Biru Terang' },
  { value: 'bg-green-50', label: 'Hijau Terang' },
  { value: 'bg-yellow-50', label: 'Kuning Terang' },
];

const borderColorOptions = [
  { value: 'border-green-500', label: 'Hijau' },
  { value: 'border-blue-500', label: 'Biru' },
  { value: 'border-red-500', label: 'Merah' },
  { value: 'border-yellow-500', label: 'Kuning' },
  { value: 'border-purple-500', label: 'Ungu' },
  { value: 'border-gray-500', label: 'Abu-abu' },
];

const fontFamilyOptions = [
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
];

const fontWeightOptions = [
  { value: 'normal', label: 'Normal' },
  { value: 'medium', label: 'Medium' },
  { value: 'semibold', label: 'Semi Bold' },
  { value: 'bold', label: 'Bold' },
  { value: 'extrabold', label: 'Extra Bold' },
];

const dateFormatOptions = [
  { value: 'default', label: 'Default (Senin, 01 Januari 2023)' },
  { value: 'short', label: 'Pendek (01/01/2023)' },
  { value: 'long', label: 'Panjang (Senin, 01 Januari 2023 08:00 WIB)' },
];

interface SettingsPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onClose: () => void;
}

type TabType = 'umum' | 'header' | 'waktu' | 'tv' | 'agenda' | 'runningtext';

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings, onClose }) => {
  const [localSettings, setLocalSettings] = useState<Settings>({...settings});
  const [activeTab, setActiveTab] = useState<TabType>('umum');
  
  const handleSave = () => {
    setSettings(localSettings);
    onClose();
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLocalSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };


  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Pengaturan Papan Informasi</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto mb-4">
          <button 
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'umum' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('umum')}
          >
            <Layout className="w-4 h-4 mr-1" /> Umum
          </button>
          <button 
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'header' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('header')}
          >
            <Type className="w-4 h-4 mr-1" /> Header
          </button>
          <button 
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'waktu' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('waktu')}
          >
            <Clock className="w-4 h-4 mr-1" /> Waktu
          </button>
          <button 
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'tv' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('tv')}
          >
            <Tv className="w-4 h-4 mr-1" /> TV Streaming
          </button>
          <button 
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'agenda' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('agenda')}
          >
            <Calendar className="w-4 h-4 mr-1" /> Agenda
          </button>
          <button 
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'runningtext' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('runningtext')}
          >
            <MessageSquare className="w-4 h-4 mr-1" /> Running Text
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Umum Tab */}
          {activeTab === 'umum' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Instansi
                </label>
                <input
                  type="text"
                  name="institutionName"
                  value={localSettings.institutionName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teks Footer
                </label>
                <textarea
                  name="footerText"
                  value={localSettings.footerText}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Latar Belakang
                </label>
                <select
                  name="bgColor"
                  value={localSettings.bgColor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {bgOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Teks
                </label>
                <select
                  name="textColor"
                  value={localSettings.textColor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {textColorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Header Tab */}
          {activeTab === 'header' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ukuran Font Header
                </label>
                <select
                  name="headerFontSize"
                  value={localSettings.headerFontSize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {fontSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Font Header
                </label>
                <select
                  name="headerFontFamily"
                  value={localSettings.headerFontFamily || 'Montserrat, sans-serif'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {fontFamilyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ketebalan Font Header
                </label>
                <select
                  name="headerFontWeight"
                  value={localSettings.headerFontWeight || 'bold'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {fontWeightOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Font Header
                </label>
                <select
                  name="headerTextColor"
                  value={localSettings.headerTextColor || localSettings.textColor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {textColorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Video Tab */}
          {/* Video tab has been removed as per user request */}

          {/* Waktu Tab */}
          {activeTab === 'waktu' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format Tanggal dan Waktu
                </label>
                <select
                  name="dateTimeFormat"
                  value={localSettings.dateTimeFormat}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dateFormatOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {/* Agenda Tab */}
          {activeTab === 'agenda' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Widget Agenda
                </label>
                <input
                  type="text"
                  name="announcementTitle"
                  value={localSettings.announcementTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ukuran Font Agenda
                </label>
                <select
                  name="announcementFontSize"
                  value={localSettings.announcementFontSize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="text-xs">Kecil</option>
                  <option value="text-sm">Sedang</option>
                  <option value="text-base">Besar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kecepatan Scroll Agenda
                </label>
                <select
                  name="announcementScrollSpeed"
                  value={localSettings.announcementScrollSpeed}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Lambat</option>
                  <option value="2">Sedang</option>
                  <option value="3">Cepat</option>
                  <option value="4">Sangat Cepat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arah Scroll Agenda
                </label>
                <select
                  name="announcementScrollDirection"
                  value={localSettings.announcementScrollDirection}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="up">Ke Atas</option>
                  <option value="down">Ke Bawah</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Latar Agenda
                </label>
                <select
                  name="announcementBgColor"
                  value={localSettings.announcementBgColor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {bgColorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Teks Agenda
                </label>
                <select
                  name="announcementTextColor"
                  value={localSettings.announcementTextColor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {textColorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Border Agenda
                </label>
                <select
                  name="announcementBorderColor"
                  value={localSettings.announcementBorderColor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {borderColorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showAnnouncementControls"
                  name="showAnnouncementControls"
                  checked={localSettings.showAnnouncementControls}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showAnnouncementControls" className="ml-2 block text-sm text-gray-700">
                  Tampilkan Kontrol Agenda
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="enableAnnouncementEditing"
                  name="enableAnnouncementEditing"
                  checked={localSettings.enableAnnouncementEditing}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableAnnouncementEditing" className="ml-2 block text-sm text-gray-700">
                  Aktifkan Fitur Edit Agenda
                </label>
              </div>
            </>
          )}

          {/* TV Tab */}
          {activeTab === 'tv' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Widget TV Streaming
                </label>
                <input
                  type="text"
                  name="tvStreamingTitle"
                  value={localSettings.tvStreamingTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Stream Default
                </label>
                <input
                  type="text"
                  name="defaultStreamUrl"
                  value={localSettings.defaultStreamUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Masukkan URL streaming HLS (.m3u8) atau URL embed untuk layanan streaming lainnya
                </p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showTVStreamingControls"
                  name="showTVStreamingControls"
                  checked={localSettings.showTVStreamingControls}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showTVStreamingControls" className="ml-2 block text-sm text-gray-700">
                  Tampilkan Kontrol TV Streaming
                </label>
              </div>
            </>
          )}

          {/* Running Text Tab */}
          {activeTab === 'runningtext' && (
            <>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="enableRunningText"
                  name="enableRunningText"
                  checked={localSettings.enableRunningText}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableRunningText" className="ml-2 block text-sm font-medium text-gray-900">
                  Tampilkan Running Text
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Teks
                </label>
                <input
                  type="color"
                  name="runningTextColor"
                  value={localSettings.runningTextColor}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Latar Belakang Teks
                </label>
                <input
                  type="color"
                  name="runningTextBgColor"
                  value={localSettings.runningTextBgColor}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Latar Belakang Tanggal
                </label>
                <input
                  type="color"
                  name="runningTextDateBgColor"
                  value={localSettings.runningTextDateBgColor}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Warna Latar Belakang Jam
                </label>
                <input
                  type="color"
                  name="runningTextTimeBgColor"
                  value={localSettings.runningTextTimeBgColor}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kecepatan Scroll
                </label>
                <select
                  name="runningTextScrollSpeed"
                  value={localSettings.runningTextScrollSpeed}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="150">Sangat Lambat</option>
                  <option value="120">Lambat</option>
                  <option value="90">Sedang</option>
                  <option value="60">Cepat</option>
                  <option value="30">Sangat Cepat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arah Scroll
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="runningTextDirection"
                      value="left"
                      checked={localSettings.runningTextDirection === 'left'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Ke Kiri</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="runningTextDirection"
                      value="right"
                      checked={localSettings.runningTextDirection === 'right'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">Ke Kanan</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teks Running (satu per baris)
                </label>
                <textarea
                  name="runningTextItemsText"
                  value={localSettings.runningTextItems ? localSettings.runningTextItems.join('\n') : ''}
                  onChange={(e) => {
                    const textValue = e.target.value;
                    const textItems = textValue.split('\n').filter(item => item.trim() !== '');
                    setLocalSettings(prev => ({
                      ...prev,
                      runningTextItems: textItems
                    }));
                  }}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan teks yang akan ditampilkan (satu per baris)"
                />
                <p className="text-xs text-gray-500 mt-1">Setiap baris akan ditampilkan sebagai item terpisah</p>
              </div>
            </>
          )}
        </div>
        
        <div className="border-t p-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
