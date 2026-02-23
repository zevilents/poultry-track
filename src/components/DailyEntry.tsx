import React from 'react';
import { Save, Calendar, Skull, Utensils, Scale } from 'lucide-react';
import { DailyRecord } from '../types';
import { supabase } from '../lib/supabase';

interface DailyEntryProps {
  onSave: (record: Omit<DailyRecord, 'id'>) => void;
  lastAge: number;
}

export const DailyEntry: React.FC<DailyEntryProps> = ({ onSave, lastAge }) => {
  const [formData, setFormData] = React.useState({
    date: new Date().toISOString().split('T')[0],
    age: lastAge + 1,
    mortality: 0,
    culling: 0,
    feedIntake: 0,
    bodyWeight: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('recording_harian')
      .insert([{ 
        umur: formData.age, 
        kematian: formData.mortality, 
        culling: formData.culling, 
        pakan_kg: formData.feedIntake, 
        bw_gram: formData.bodyWeight 
      }]);

    if (error) alert("Gagal simpan harian: " + error.message);
    else {
      alert("Recording Berhasil Disimpan!");
      onSave({ ...formData, flockId: '1' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
        <h2 className="text-2xl font-bold">Recording Harian</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">Umur</label>
            <input type="number" className="input-field" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}/>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">Mati</label>
            <input type="number" className="input-field" onChange={e => setFormData({...formData, mortality: parseInt(e.target.value) || 0})}/>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">Afkir</label>
            <input type="number" className="input-field" onChange={e => setFormData({...formData, culling: parseInt(e.target.value) || 0})}/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">Pakan (Kg)</label>
            <input type="number" step="0.01" className="input-field" onChange={e => setFormData({...formData, feedIntake: parseFloat(e.target.value) || 0})}/>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-400">BW (Gram)</label>
            <input type="number" className="input-field" onChange={e => setFormData({...formData, bodyWeight: parseInt(e.target.value) || 0})}/>
          </div>
        </div>
        <button type="submit" className="btn-primary w-full py-4"><Save size={20}/> Simpan Recording</button>
      </form>
    </div>
  );
};