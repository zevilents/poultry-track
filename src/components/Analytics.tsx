import React from 'react';
import { Download, Filter } from 'lucide-react';
import { DailyRecord } from '../types';

interface AnalyticsProps {
  records: DailyRecord[];
  docWeight: number;
}

export const Analytics: React.FC<AnalyticsProps> = ({ records, docWeight }) => {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Historical Analytics</h2>
          <p className="text-slate-500">Detailed log of all daily recordings</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="btn-primary">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </header>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Age</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Mortality</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Culling</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Feed (kg)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">BW (g)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">ADG (g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                    No records found. Please add daily entries to see data.
                  </td>
                </tr>
              ) : (
                [...records].reverse().map((record) => {
                  const prevRecord = records.find(r => r.age === record.age - 1);
                  const adg = prevRecord ? (record.bodyWeight - prevRecord.bodyWeight) : record.bodyWeight - docWeight;

                  return (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">{record.age}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{record.date}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${record.mortality > 5 ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                          {record.mortality}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-slate-600">{record.culling}</td>
                      <td className="px-6 py-4 text-right font-mono text-sm text-slate-600">{record.feedIntake.toFixed(1)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-700">{record.bodyWeight}</td>
                      <td className="px-6 py-4 text-right text-emerald-600 font-semibold">+{adg}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
