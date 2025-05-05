import React, { useState } from 'react';
import { X } from 'lucide-react';
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

interface SettingsPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings, onClose }) => {
  const [localSettings, setLocalSettings] = useState<Settings>({...settings});
  
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
        
        <div className="p-4 space-y-4">
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
