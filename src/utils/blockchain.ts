// Mock blockchain utilities - In production, integrate with actual Web3 libraries
export class BlockchainService {
  private static instance: BlockchainService;

  public static getInstance(): BlockchainService {
    if (!BlockchainService.instance) {
      BlockchainService.instance = new BlockchainService();
    }
    return BlockchainService.instance;
  }

  // Mock wallet connection
  async connectWallet(): Promise<string> {
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return '0x742d35Cc6634C0532925a3b8D404d1A3e1d5C4B9';
  }

  // Mock smart contract interaction
  async mintCarbonCredits(projectId: string, amount: number): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return `0x${Math.random().toString(16).substr(2, 40)}`;
  }

  // Mock verification on blockchain
  async verifyCredits(creditId: string, verificationData: any): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `0x${Math.random().toString(16).substr(2, 40)}`;
  }

  // Mock transaction status
  async getTransactionStatus(txHash: string): Promise<'pending' | 'confirmed' | 'failed'> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'confirmed';
  }

  // Mock balance check
  async getCreditsBalance(walletAddress: string): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return Math.floor(Math.random() * 10000);
  }
}

export const formatWalletAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatTxHash = (hash: string): string => {
  if (!hash) return '';
  return `${hash.slice(0, 8)}...${hash.slice(-6)}`;
};