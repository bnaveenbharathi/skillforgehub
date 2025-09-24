import {
  Certificate,
  VerificationResult,
  IssueCertificateRequest,
  WalletState,
} from "../types/certificate";

// Extend the Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      isMetaMask?: boolean;
    };
  }
}

// Mock certificate database with dummy data
const MOCK_CERTIFICATES: { [key: string]: Certificate } = {
  "CERT-ABC123XYZ456": {
    id: "CERT-ABC123XYZ456",
    recipientName: "John Smith",
    recipientEmail: "john.smith@email.com",
    courseName: "Advanced React Development",
    courseId: "REACT-ADV-001",
    issuerName: "SkillForge Hub",
    issuerAddress: "0x1234567890123456789012345678901234567890",
    issueDate: new Date("2024-08-15"),
    expirationDate: new Date("2026-08-15"),
    grade: "A+",
    skills: ["React", "TypeScript", "Redux", "Next.js", "Testing"],
    verified: true,
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    blockNumber: 18945672,
    ipfsHash: "QmX7Y8Z9...",
  },
  "CERT-DEF789UVW123": {
    id: "CERT-DEF789UVW123",
    recipientName: "Sarah Johnson",
    recipientEmail: "sarah.johnson@email.com",
    courseName: "Full Stack JavaScript Development",
    courseId: "JS-FULL-002",
    issuerName: "SkillForge Hub",
    issuerAddress: "0x1234567890123456789012345678901234567890",
    issueDate: new Date("2024-09-01"),
    expirationDate: new Date("2027-09-01"),
    grade: "A",
    skills: ["JavaScript", "Node.js", "MongoDB", "Express", "Vue.js"],
    verified: true,
    transactionHash:
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    blockNumber: 18965431,
    ipfsHash: "QmA1B2C3...",
  },
  "CERT-GHI456MNO789": {
    id: "CERT-GHI456MNO789",
    recipientName: "Mike Davis",
    recipientEmail: "mike.davis@email.com",
    courseName: "Blockchain Development Fundamentals",
    courseId: "BLOCKCHAIN-101",
    issuerName: "SkillForge Hub",
    issuerAddress: "0x1234567890123456789012345678901234567890",
    issueDate: new Date("2024-07-20"),
    expirationDate: new Date("2025-07-20"),
    grade: "B+",
    skills: ["Solidity", "Web3", "Smart Contracts", "DeFi", "NFTs"],
    verified: true,
    transactionHash:
      "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba",
    blockNumber: 18923456,
    ipfsHash: "QmZ9Y8X7...",
  },
  "CERT-JKL123PQR456": {
    id: "CERT-JKL123PQR456",
    recipientName: "Emma Wilson",
    recipientEmail: "emma.wilson@email.com",
    courseName: "Python Data Science Bootcamp",
    courseId: "PY-DATA-003",
    issuerName: "SkillForge Hub",
    issuerAddress: "0x1234567890123456789012345678901234567890",
    issueDate: new Date("2024-06-10"),
    expirationDate: new Date("2026-06-10"),
    grade: "A+",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Machine Learning",
      "Data Visualization",
    ],
    verified: true,
    transactionHash:
      "0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321",
    blockNumber: 18876543,
    ipfsHash: "QmP4O5N6...",
  },
  "CERT-MNO789STU012": {
    id: "CERT-MNO789STU012",
    recipientName: "Alex Thompson",
    recipientEmail: "alex.thompson@email.com",
    courseName: "DevOps and Cloud Architecture",
    courseId: "DEVOPS-CLOUD-004",
    issuerName: "SkillForge Hub",
    issuerAddress: "0x1234567890123456789012345678901234567890",
    issueDate: new Date("2024-05-25"),
    expirationDate: undefined, // No expiration
    grade: "A",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    verified: true,
    transactionHash:
      "0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef",
    blockNumber: 18834567,
    ipfsHash: "QmL7M8N9...",
  },
};

// Invalid/Revoked certificates
const INVALID_CERTIFICATES = [
  "CERT-INVALID001",
  "CERT-REVOKED123",
  "CERT-EXPIRED456",
  "CERT-FAKE789",
];

export class MockBlockchainService {
  private mockWalletState: WalletState = {
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
  };

  private mockWalletAddress = "0x742d35cc6bf4532c4c2c8db8e64a1b13c4a2b19f";

  // Simulate MetaMask connection
  async connectWallet(): Promise<WalletState> {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        throw new Error(
          "MetaMask not detected. Please install MetaMask to continue."
        );
      }

      // Request account access using real MetaMask
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts && accounts.length > 0) {
        this.mockWalletState = {
          isConnected: true,
          address: accounts[0],
          chainId: 11155111, // Sepolia testnet
          provider: { name: "MetaMask" },
        };

        this.mockWalletAddress = accounts[0];

        return this.mockWalletState;
      } else {
        throw new Error("No accounts found. Please unlock MetaMask.");
      }
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === 4001
      ) {
        throw new Error("Connection request was rejected by the user.");
      }
      throw new Error(
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string"
          ? error.message
          : "Failed to connect wallet"
      );
    }
  }

  // Issue a new certificate (mock)
  async issueCertificate(request: IssueCertificateRequest): Promise<string> {
    if (!this.mockWalletState.isConnected) {
      throw new Error("Wallet not connected");
    }

    // Generate mock certificate ID
    const certificateId = this.generateMockCertificateId();

    // Simulate transaction loading
    await this.delay(2000);

    // Simulate MetaMask transaction confirmation
    const userConfirmed = await this.simulateTransactionConfirmation();

    if (!userConfirmed) {
      throw new Error("User rejected the transaction");
    }

    // Simulate blockchain processing
    await this.delay(3000);

    // Create and store the mock certificate
    const mockCertificate: Certificate = {
      id: certificateId,
      recipientName: request.recipientName,
      recipientEmail: request.recipientEmail,
      courseName: request.courseName,
      courseId: request.courseId,
      issuerName: "SkillForge Hub",
      issuerAddress: this.mockWalletState.address!,
      issueDate: new Date(),
      expirationDate: request.expirationDate,
      grade: request.grade || "Pass",
      skills: request.skills,
      verified: true,
      transactionHash: this.generateMockTxHash(),
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      ipfsHash: this.generateMockIPFSHash(),
    };

    // Add to mock database
    MOCK_CERTIFICATES[certificateId] = mockCertificate;

    return this.generateMockTxHash();
  }

  // Verify certificate
  async verifyCertificate(certificateId: string): Promise<VerificationResult> {
    // Simulate blockchain query delay
    await this.delay(1000);

    // Check if certificate is in invalid list
    if (INVALID_CERTIFICATES.includes(certificateId)) {
      return {
        isValid: false,
        error: this.getInvalidReason(certificateId),
      };
    }

    // Check if certificate exists in mock database
    const certificate = MOCK_CERTIFICATES[certificateId];

    if (!certificate) {
      return {
        isValid: false,
        error: "Certificate not found on blockchain",
      };
    }

    // Check if expired
    if (certificate.expirationDate && new Date() > certificate.expirationDate) {
      return {
        isValid: false,
        certificate,
        error: "Certificate has expired",
      };
    }

    return {
      isValid: true,
      certificate,
      transactionHash: certificate.transactionHash,
      blockTimestamp: certificate.issueDate.getTime() / 1000,
    };
  }

  // Get certificates by recipient (mock)
  async getCertificatesByRecipient(
    recipientAddress: string
  ): Promise<Certificate[]> {
    await this.delay(800);

    // Return certificates for mock wallet address
    if (recipientAddress === this.mockWalletAddress) {
      return Object.values(MOCK_CERTIFICATES).slice(0, 3);
    }

    return [];
  }

  // Revoke certificate (mock)
  async revokeCertificate(certificateId: string): Promise<string> {
    if (!this.mockWalletState.isConnected) {
      throw new Error("Wallet not connected");
    }

    await this.delay(1500);

    const userConfirmed = await this.simulateTransactionConfirmation("revoke");
    if (!userConfirmed) {
      throw new Error("User rejected the transaction");
    }

    // Mark as invalid
    INVALID_CERTIFICATES.push(certificateId);

    return this.generateMockTxHash();
  }

  // Helper methods
  isWalletConnected(): boolean {
    return this.mockWalletState.isConnected;
  }

  async getCurrentAddress(): Promise<string | null> {
    return this.mockWalletState.address;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private generateMockCertificateId(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "CERT-";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private generateMockTxHash(): string {
    const chars = "0123456789abcdef";
    let result = "0x";
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private generateMockIPFSHash(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "Qm";
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private async simulateTransactionConfirmation(
    type: string = "issue"
  ): Promise<boolean> {
    const action =
      type === "revoke" ? "revoke this certificate" : "issue a new certificate";
    const gasFee = (Math.random() * 0.005 + 0.002).toFixed(6);

    return new Promise((resolve) => {
      const result = window.confirm(
        `🦊 MetaMask Transaction Confirmation\n\n` +
          `You are about to ${action}.\n\n` +
          `Gas Fee: ${gasFee} ETH\n` +
          `Network: Sepolia Testnet\n\n` +
          `Click OK to confirm or Cancel to reject.`
      );
      resolve(result);
    });
  }

  private getInvalidReason(certificateId: string): string {
    if (certificateId.includes("INVALID")) {
      return "Certificate ID is invalid or malformed";
    }
    if (certificateId.includes("REVOKED")) {
      return "Certificate has been revoked by the issuer";
    }
    if (certificateId.includes("EXPIRED")) {
      return "Certificate has expired and is no longer valid";
    }
    if (certificateId.includes("FAKE")) {
      return "Certificate appears to be counterfeit";
    }
    return "Certificate verification failed";
  }
}
