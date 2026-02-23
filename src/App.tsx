import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Dashboard } from './components/Dashboard';
import { DailyEntry } from './components/DailyEntry';
import { FlockSetup } from './components/FlockSetup';
import { DailyRecord, Flock, KPIMetrics } from './types';
import { LayoutDashboard, ClipboardList, Settings2 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState<DailyRecord[]>([]);
  const [flock, setFlock] = useState<Flock>({
    id: '1', chickInDate: '', initialPopulation: 0, docWeight: 0, breed: 'Cobb 500', status: 'active'
  });

  const fetchData = async () => {
    // Ambil Data Setup menggunakan ID angka 1
    const { data: fData } = await supabase.from('flocks').select('*').eq('id', 1).single();
    if (fData) setFlock({
      id: fData.id.toString(), 
      chickInDate: fData.chick_in_date, 
      initialPopulation: fData.initial_population,
      docWeight: fData.doc_weight, 
      breed: fData.breed, 
      status: 'active'
    });

    // Ambil Data Harian
    const { data: recs } = await supabase.from('recording_harian').select('*').order('umur', { ascending: true });
    if (recs) setRecords(recs.map(r => ({
      id: r.id, flockId: '1', date: '', age: r.umur, mortality: r.kematian, 
      culling: r.culling, feedIntake: r.pakan_kg, bodyWeight: r.bw_gram
    })));
  };

  useEffect(() => { fetchData(); }, []);

  const calculateMetrics = (): KPIMetrics => {
    const totalMati = records.reduce((sum, r) => sum + r.mortality + r.culling, 0);
    const totalPakan = records.reduce((sum, r) => sum + r.feedIntake, 0);
    const lastRec = records[records.length - 1] || { age: 1, bodyWeight: flock.docWeight || 40 };
    
    const remaining = (flock.initialPopulation || 0) - totalMati;
    const sr = flock.initialPopulation > 0 ? (remaining / flock.initialPopulation) * 100 : 0;
    
    const totalWeightKg = (remaining * lastRec.bodyWeight) / 1000;
    const fcr = totalWeightKg > 0 ? totalPakan / totalWeightKg : 0;
    const ip = (fcr > 0 && lastRec.age > 0) ? (sr * (lastRec.bodyWeight / 1000)) / (fcr * lastRec.age) * 100 : 0;

    return {
      remainingBirds: remaining,
      survivalRate: sr,
      totalFeed: totalPakan,
      fcr: fcr,
      adg: lastRec.age > 0 ? (lastRec.bodyWeight - flock.docWeight) / lastRec.age : 0,
      ip: ip,
      currentBW: lastRec.bodyWeight,
      depletionRate: 100 - sr
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 p-1.5 rounded-lg text-white">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="font-bold text-xl text-slate-900">PoultryTrack</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('dashboard')} className={`nav-btn ${activeTab==='dashboard'?'active':''}`}>Dashboard</button>
            <button onClick={() => setActiveTab('input')} className={`nav-btn ${activeTab==='input'?'active':''}`}>Recording</button>
            <button onClick={() => setActiveTab('setup')} className={`nav-btn ${activeTab==='setup'?'active':''}`}>Setup</button>
          </div>
        </div>
      </nav>

      <main className="flex-grow p-4 md:p-8">
        {activeTab === 'dashboard' && <Dashboard metrics={calculateMetrics()} records={records} />}
        {activeTab === 'input' && <DailyEntry onSave={fetchData} lastAge={records.length > 0 ? records[records.length-1].age : 0} />}
        {activeTab === 'setup' && <FlockSetup flock={flock} onSave={fetchData} />}
      </main>
    </div>
  );
}

export default App;