import React from 'react';
import { Save, Calendar, Users, Scale } from 'lucide-react';
import { Flock } from '../types';
import { supabase } from '../lib/supabase';

interface FlockSetupProps {
  flock: Flock;
  onSave: (flock: Flock) => void;
}

export const FlockSetup: React.FC<FlockSetupProps> = ({ flock, onSave }) => {
  const [formData, setFormData] = React.useState({
    ...flock,
    chickInDate: flock.chickInDate || new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('flocks')
      .upsert({
        id: 1, // Menggunakan angka 1 untuk tipe BigInt
        chick_in_date: formData.chickInDate,
        initial_population: formData.initialPopulation,
        doc_weight: formData.docWeight,
        breed: formData.breed
      });

    if (error) alert("Gagal Simpan: " + error.message);
    else {
      alert("Konfigurasi Berhasil Disimpan!");
      onSave(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6">Setup Kandang</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2"><Calendar size={16}/> Tanggal Chick-In</label>
            <input type="date" className="input-field" value={formData.chickInDate} onChange={e => setFormData({...formData, chickInDate: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2"><Users size={16}/> Populasi Awal</label>
              <input type="number" className="input-field" value={formData.initialPopulation} onChange={e => setFormData({...formData, initialPopulation: parseInt(e.target.value) || 0})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2"><Scale size={16}/> Berat DOC (g)</label>
              <input type="number" className="input-field" value={formData.docWeight} onChange={e => setFormData({...formData, docWeight: parseInt(e.target.value) || 0})} />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-4 mt-4"><Save size={20} /> Simpan Konfigurasi</button>
        </form>
      </div>
    </div>
  );
};