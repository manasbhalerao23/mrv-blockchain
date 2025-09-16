import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

export const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: 'Project Overview', description: 'Comprehensive project performance summary' },
    { id: 'credits', name: 'Carbon Credits Report', description: 'Detailed carbon credit issuance and trading' },
    { id: 'verification', name: 'Verification Status', description: 'Current verification progress and results' },
    { id: 'financial', name: 'Financial Summary', description: 'Revenue and cost analysis' },
    { id: 'environmental', name: 'Environmental Impact', description: 'Carbon sequestration and biodiversity metrics' },
  ];

  const mockReportData = {
    totalCreditsIssued: 22600,
    totalRevenue: 1785400,
    activeProjects: 3,
    verificationRate: 87.5,
    monthlyGrowth: 12.5,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports for your carbon credit projects</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Credits Issued</p>
              <p className="text-xl font-bold text-gray-900">{mockReportData.totalCreditsIssued.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">${(mockReportData.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-xl font-bold text-gray-900">{mockReportData.activeProjects}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">%</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Verification Rate</p>
              <p className="text-xl font-bold text-gray-900">{mockReportData.verificationRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Growth</p>
              <p className="text-xl font-bold text-gray-900">+{mockReportData.monthlyGrowth}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Types */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
              <p className="text-sm text-gray-600">Select a report type to generate</p>
            </div>
            <div className="divide-y divide-gray-200">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedReport === report.id ? 'bg-blue-50 border-r-4 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <FileText className={`w-5 h-5 mt-0.5 ${
                      selectedReport === report.id ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div>
                      <h3 className={`font-medium ${
                        selectedReport === report.id ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {report.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {reportTypes.find(r => r.id === selectedReport)?.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Chart Placeholder */}
              <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Interactive Chart</p>
                  <p className="text-sm text-gray-500">
                    {selectedReport === 'overview' && 'Project performance over time'}
                    {selectedReport === 'credits' && 'Carbon credits issuance timeline'}
                    {selectedReport === 'verification' && 'Verification status breakdown'}
                    {selectedReport === 'financial' && 'Revenue and cost analysis'}
                    {selectedReport === 'environmental' && 'Environmental impact metrics'}
                  </p>
                </div>
              </div>

              {/* Report Content Preview */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Summary Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Projects:</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Credits:</span>
                        <span className="font-medium">22,600</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Price/Ton:</span>
                        <span className="font-medium">$78.50</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verification Rate:</span>
                        <span className="font-medium text-green-600">87.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Growth:</span>
                        <span className="font-medium text-green-600">+12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CO₂ Sequestered:</span>
                        <span className="font-medium">22,600 tons</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Seagrass restoration projects show highest carbon sequestration rates</li>
                    <li>• Verification times have improved by 23% compared to last quarter</li>
                    <li>• Average credit price increased by 8% over the reporting period</li>
                    <li>• Three new projects are scheduled to begin in the next quarter</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};