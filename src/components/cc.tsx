import React, { useState } from 'react';
import { Plus, Filter, Search, ExternalLink, Download } from 'lucide-react';
import { mockCredits, mockProjects } from '../utils/mockdata';
import type { CarbonCredit } from '../types/index';
import { formatTxHash } from '../utils/blockchain';

export const CarbonCredits: React.FC = () => {
  const [credits] = useState<CarbonCredit[]>(mockCredits);
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'sold': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'retired': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCredits = credits.filter(credit => {
    const matchesFilter = filter === 'all' || credit.status === filter;
    const matchesSearch = credit.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.blockchainTxHash.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getProjectName = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carbon Credits</h1>
          <p className="text-gray-600">Track and manage your blockchain-verified carbon credits</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Issue Credits</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by serial number or transaction hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
            <option value="retired">Retired</option>
          </select>
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Credits Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blockchain Tx
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCredits.map((credit) => (
                <tr key={credit.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{credit.serialNumber}</div>
                    <div className="text-xs text-gray-500">Vintage {credit.vintage}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getProjectName(credit.projectId)}</div>
                    <div className="text-xs text-gray-500">{credit.methodology}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{credit.amount} tons</div>
                    <div className="text-xs text-gray-500">CO₂ equivalent</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${credit.price}</div>
                    <div className="text-xs text-gray-500">per ton</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(credit.status)}`}>
                      {credit.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => window.open(`https://etherscan.io/tx/${credit.blockchainTxHash}`, '_blank')}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <span>{formatTxHash(credit.blockchainTxHash)}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCredit(credit)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Detail Modal */}
      {selectedCredit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Carbon Credit Details</h2>
                  <p className="text-gray-600">{selectedCredit.serialNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedCredit(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Status and Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${getStatusColor(selectedCredit.status)} mt-1`}>
                      {selectedCredit.status}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-xl font-bold text-gray-900">{selectedCredit.amount} tons CO₂</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Price per Ton</p>
                    <p className="text-xl font-bold text-gray-900">${selectedCredit.price}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-xl font-bold text-gray-900">${selectedCredit.price * selectedCredit.amount}</p>
                  </div>
                </div>

                {/* Blockchain Information */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Blockchain Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Transaction Hash</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-mono text-gray-900">{selectedCredit.blockchainTxHash}</p>
                        <button
                          onClick={() => window.open(`https://etherscan.io/tx/${selectedCredit.blockchainTxHash}`, '_blank')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Issuance Date</p>
                      <p className="text-sm text-gray-900">{new Date(selectedCredit.issuanceDate).toLocaleDateString()}</p>
                    </div>
                    {selectedCredit.verificationDate && (
                      <div>
                        <p className="text-sm text-gray-600">Verification Date</p>
                        <p className="text-sm text-gray-900">{new Date(selectedCredit.verificationDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Information */}
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Project Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Project Name</p>
                      <p className="text-sm text-gray-900">{getProjectName(selectedCredit.projectId)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Methodology</p>
                      <p className="text-sm text-gray-900">{selectedCredit.methodology}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vintage Year</p>
                      <p className="text-sm text-gray-900">{selectedCredit.vintage}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Download Certificate
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    View on Blockchain
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};