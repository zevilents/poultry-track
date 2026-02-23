import React from 'react';
import { 
  Users, 
  Skull, 
  Activity, 
  Scale, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { KPIMetrics, DailyRecord } from '../types';

interface DashboardProps {
  metrics: KPIMetrics;
  records: DailyRecord[];
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics, records }) => {
  const kpiCards = [
    { label: 'Live Birds', value: metrics.remainingBirds.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Survival Rate', value: `${metrics.survivalRate.toFixed(2)}%`, icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'FCR', value: metrics.fcr.toFixed(3), icon: Scale, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'IP Index', value: metrics.ip.toFixed(0), icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const secondaryMetrics = [
    { label: 'Avg Body Weight', value: `${(metrics.currentBW / 1000).toFixed(3)} kg`, trend: '+12%', isUp: true },
    { label: 'Total Feed', value: `${metrics.totalFeed.toLocaleString()} kg`, trend: '+5%', isUp: true },
    { label: 'Mortality', value: `${metrics.depletionRate.toFixed(2)}%`, trend: '-2%', isUp: false },
    { label: 'ADG', value: `${metrics.adg.toFixed(1)} g/day`, trend: '+3%', isUp: true },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Command Center</h2>
        <p className="text-slate-500">Real-time performance monitoring for Flock-001</p>
      </header>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-4">
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {secondaryMetrics.map((metric, i) => (
          <div key={i} className="glass-card p-5">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{metric.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-xl font-bold text-slate-800">{metric.value}</p>
              <div className={`flex items-center text-xs font-bold ${metric.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metric.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {metric.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Body Weight Growth (g)</h3>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-3 h-3 rounded-full bg-primary" />
              Actual BW
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={records}>
                <defs>
                  <linearGradient id="colorBW" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#13ec13" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#13ec13" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} label={{ value: 'Age (Days)', position: 'insideBottom', offset: -5, fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="bodyWeight" stroke="#13ec13" strokeWidth={3} fillOpacity={1} fill="url(#colorBW)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Daily Feed Intake (kg)</h3>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              FI
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={records}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="age" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="feedIntake" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
