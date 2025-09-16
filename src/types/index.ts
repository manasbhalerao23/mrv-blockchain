export interface CarbonProject {
  id: string;
  name: string;
  location: string;
  type: 'mangrove' | 'seagrass' | 'salt_marsh';
  area: number; // in hectares
  estimatedCredits: number;
  verifiedCredits: number;
  status: 'active' | 'pending' | 'completed' | 'suspended';
  startDate: string;
  endDate: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  description: string;
  owner: string;
  verifier?: string;
}

export interface CarbonCredit {
  id: string;
  projectId: string;
  amount: number; // in tons CO2
  price: number; // in USD
  status: 'pending' | 'verified' | 'sold' | 'retired';
  issuanceDate: string;
  verificationDate?: string;
  blockchainTxHash: string;
  serialNumber: string;
  vintage: string;
  methodology: string;
}

export interface VerificationReport {
  id: string;
  projectId: string;
  creditId: string;
  verifierId: string;
  verificationDate: string;
  status: 'approved' | 'rejected' | 'pending';
  findings: string;
  recommendations: string[];
  attachments: string[];
  blockchainTxHash?: string;
}

export interface User {
  id: string;
  walletAddress: string;
  name: string;
  role: 'project_owner' | 'verifier' | 'buyer' | 'admin';
  email: string;
  organization: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalCredits: number;
  totalValue: number;
  pendingVerifications: number;
  monthlyGrowth: number;
  carbonSequestered: number;
}