export interface Certificate {
  id: string;
  recipientName: string;
  recipientEmail: string;
  courseName: string;
  courseId: string;
  issuerName: string;
  issuerAddress: string;
  issueDate: Date;
  expirationDate?: Date;
  grade?: string;
  skills: string[];
  transactionHash?: string;
  blockNumber?: number;
  verified: boolean;
  ipfsHash?: string;
}

export interface CertificateMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

export interface VerificationResult {
  isValid: boolean;
  certificate?: Certificate;
  error?: string;
  transactionHash?: string;
  blockTimestamp?: number;
}

export interface IssueCertificateRequest {
  recipientAddress: string;
  recipientName: string;
  recipientEmail: string;
  courseName: string;
  courseId: string;
  skills: string[];
  grade?: string;
  expirationDate?: Date;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  provider: any;
}
