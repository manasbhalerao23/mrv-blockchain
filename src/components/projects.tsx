import React, { useState } from 'react';
import { Plus, MapPin, Calendar, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';
import { mockProjects } from '../utils/mockdata';
import type { CarbonProject } from '../types/index';

export const Projects: React.FC = () => {
  const [projects] = useState<CarbonProject[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    const baseClasses = "w-6 h-6";
    switch (type) {
      case 'mangrove': return <div className={`${baseClasses} bg-green-600 rounded`}>🌳</div>;
      case 'seagrass': return <div className={`${baseClasses} bg-blue-600 rounded`}>🌱</div>;
      case 'salt_marsh': return <div className={`${baseClasses} bg-teal-600 rounded`}>🌾</div>;
      default: return <div className={`${baseClasses} bg-gray-600 rounded`}>🌿</div>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blue Carbon Projects</h1>
          <p className="text-gray-600">Manage and monitor your coastal ecosystem projects</p>
        </div>
        <button
          onClick={() => setShowNewProjectModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Project Image */}
            <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 relative overflow-hidden">
              <img 
                src={project.images[0]} 
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                {getTypeIcon(project.type)}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
              
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{project.location}</span>
              </div>

              <div className="flex items-center text-gray-600 text-sm mb-4">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(project.startDate).getFullYear()} - {new Date(project.endDate).getFullYear()}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{project.area.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Hectares</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{project.verifiedCredits.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Credits</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900 font-medium">
                    {Math.round((project.verifiedCredits / project.estimatedCredits) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((project.verifiedCredits / project.estimatedCredits) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>+12% this month</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedProject.images[0]} 
                    alt={selectedProject.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Area</p>
                      <p className="text-xl font-bold text-gray-900">{selectedProject.area} ha</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Credits Verified</p>
                      <p className="text-xl font-bold text-gray-900">{selectedProject.verifiedCredits}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Project Type</p>
                      <p className="text-xl font-bold text-gray-900 capitalize">{selectedProject.type.replace('_', ' ')}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-xl font-bold text-gray-900 capitalize">{selectedProject.status}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">{selectedProject.location}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedProject.coordinates.lat.toFixed(4)}, {selectedProject.coordinates.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter project name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Project location"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select type</option>
                      <option value="mangrove">Mangrove</option>
                      <option value="seagrass">Seagrass</option>
                      <option value="salt_marsh">Salt Marsh</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Project description..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewProjectModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};