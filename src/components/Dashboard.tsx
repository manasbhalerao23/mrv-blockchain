import React from 'react';
import { TrendingUp, TreePine, DollarSign, Clock, Anchor, Waves, BarChart3 } from 'lucide-react';
import { mockDashboardStats, mockProjects, mockCredits } from '../utils/mockdata';
import type { CarbonCredit, CarbonProject } from '../types';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className={`text-sm mt-1 flex items-center ${color}`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          {change}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color.includes('green') ? 'bg-green-100' : 'bg-blue-100'}`}>
        {icon}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;
  const recentProjects = mockProjects.slice(0, 3);
  const recentCredits = mockCredits.slice(0, 4);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your blue carbon projects and credits</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium text-gray-900">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value={stats.totalProjects}
          change={`+${stats.monthlyGrowth}% this month`}
          icon={<TreePine className="w-6 h-6 text-green-600" />}
          color="text-green-600"
        />
        <StatCard
          title="Carbon Credits"
          value={stats.totalCredits.toLocaleString()}
          change="+8.2% this month"
          icon={<Anchor className="w-6 h-6 text-blue-600" />}
          color="text-blue-600"
        />
        <StatCard
          title="Total Value"
          value={`$${(stats.totalValue / 1000000).toFixed(1)}M`}
          change="+12.5% this month"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="text-green-600"
        />
        <StatCard
          title="Pending Verification"
          value={stats.pendingVerifications}
          change="2 due today"
          icon={<Clock className="w-6 h-6 text-orange-600" />}
          color="text-orange-600"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Projects</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project: CarbonProject) => (
              <div key={project.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{project.name}</h3>
                  <p className="text-xs text-gray-500">{project.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{project.verifiedCredits}</p>
                  <p className="text-xs text-gray-500">credits</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Credits */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Credits</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentCredits.map((credit: CarbonCredit) => (
              <div key={credit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    credit.status === 'verified' ? 'bg-green-500' :
                    credit.status === 'sold' ? 'bg-blue-500' :
                    credit.status === 'pending' ? 'bg-orange-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{credit.amount} tons CO₂</p>
                    <p className="text-xs text-gray-500">{credit.serialNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${credit.price * credit.amount}</p>
                  <p className="text-xs text-gray-500 capitalize">{credit.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Carbon Credits Performance</h2>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive chart will display here</p>
            <p className="text-sm text-gray-500">Showing credits issued over time</p>
          </div>
        </div>
      </div>
    </div>
  );
};