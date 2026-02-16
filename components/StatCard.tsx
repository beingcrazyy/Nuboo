import React from 'react';
import { StatCardProps } from '../types';

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
        {icon && <div className="p-2 bg-brand-50 rounded-lg text-brand-600">{icon}</div>}
      </div>
      {change && (
        <div className="mt-4 flex items-center text-xs">
          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span className="text-slate-400 ml-2">vs last month</span>
        </div>
      )}
    </div>
  );
};