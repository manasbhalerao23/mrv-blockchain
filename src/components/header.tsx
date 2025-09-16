import React, { useState } from 'react';
import { Waves, Wallet, User, Settings, LogOut } from 'lucide-react';
import { formatWalletAddress, BlockchainService } from '../utils/blockchain';

interface HeaderProps {
  walletAddress: string | null;
  onWalletConnect: (address: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ walletAddress, onWalletConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleWalletConnect = async () => {
    setIsConnecting(true);
    try {
      const blockchain = BlockchainService.getInstance();
      const address = await blockchain.connectWallet();
      onWalletConnect(address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">BlueCarbon</h1>
              <p className="text-xs text-gray-500">Blockchain Verified</p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {walletAddress ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {formatWalletAddress(walletAddress)}
                  </span>
                  <User className="w-4 h-4 text-gray-600" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                      <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </button>
                      <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left">
                        <LogOut className="w-4 h-4 mr-2" />
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleWalletConnect}
                disabled={isConnecting}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};