import React, { useState } from 'react';
import { Lock, User, MapPin, LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (userName: string, farmName: string) => void;
}

const FARM_CREDENTIALS: Record<string, { name: string; password: string }> = {
  'Picung': { name: 'Heri', password: '1' },
  'Cinibung': { name: 'Adi', password: '2' },
  'Muara': { name: 'Manto', password: '3' },
  'Sajira': { name: 'Ajis', password: '4' },
};

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [farm, setFarm] = useState('Picung');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const creds = FARM_CREDENTIALS[farm];
    if (creds && creds.name.toLowerCase() === name.toLowerCase() && creds.password === password) {
      onLogin(creds.name, farm);
    } else {
      setError('Invalid Name or Password for the selected Farm.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-primary p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold">BroilerPro Login</h1>
          <p className="text-white/80 text-sm mt-1">Enterprise Poultry Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <MapPin size={16} className="text-slate-400" />
              Select Farm
            </label>
            <select 
              className="input-field"
              value={farm}
              onChange={(e) => setFarm(e.target.value)}
            >
              <option value="Picung">Picung</option>
              <option value="Cinibung">Cinibung</option>
              <option value="Muara">Muara</option>
              <option value="Sajira">Sajira</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <User size={16} className="text-slate-400" />
              Your Name
            </label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Lock size={16} className="text-slate-400" />
              Password
            </label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-lg mt-4">
            Sign In
          </button>
        </form>

        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
};
