import { ethers } from "ethers";
import {
  Certificate,
  VerificationResult,
  IssueCertificateRequest,
  WalletState,
} from "../types/certificate";
import { certificateContractABI } from "../contracts/certificateABI";

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private contract: ethers.Contract | null = null;
  private contractAddress: string;

  constructor(contractAddress: string) {
    this.contractAddress = contractAddress;
  }

  // Connect to MetaMask wallet
  async connectWallet(): Promise<WalletState> {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();

      this.contract = new ethers.Contract(
        this.contractAddress,
        certificateContractABI,
        this.signer
      );

      return {
        isConnected: true,
        address,
        chainId: Number(network.chainId),
        provider: this.provider,
      };
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  }

  // Issue a new certificate
  async issueCertificate(request: IssueCertificateRequest): Promise<string> {
    if (!this.contract || !this.signer) {
      throw new Error("Contract not initialized or wallet not connected");
    }

    try {
      const certificateData = {
        recipientAddress: request.recipientAddress,
        recipientName: request.recipientName,
        recipientEmail: request.recipientEmail,
        courseName: request.courseName,
        courseId: request.courseId,
        skills: request.skills,
        grade: request.grade || "",
        expirationDate: request.expirationDate
          ? Math.floor(request.expirationDate.getTime() / 1000)
          : 0,
      };

      const tx = await this.contract.issueCertificate(
        certificateData.recipientAddress,
        certificateData.recipientName,
        certificateData.recipientEmail,
        certificateData.courseName,
        certificateData.courseId,
        certificateData.skills,
        certificateData.grade,
        certificateData.expirationDate
      );

      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      console.error("Error issuing certificate:", error);
      throw error;
    }
  }

  // Verify a certificate
  async verifyCertificate(certificateId: string): Promise<VerificationResult> {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }

    try {
      const certificateData = await this.contract.getCertificate(certificateId);

      if (
        !certificateData ||
        certificateData.recipientAddress === ethers.ZeroAddress
      ) {
        return {
          isValid: false,
          error: "Certificate not found",
        };
      }

      const certificate: Certificate = {
        id: certificateId,
        recipientName: certificateData.recipientName,
        recipientEmail: certificateData.recipientEmail,
        courseName: certificateData.courseName,
        courseId: certificateData.courseId,
        issuerName: certificateData.issuerName,
        issuerAddress: certificateData.issuerAddress,
        issueDate: new Date(Number(certificateData.issueDate) * 1000),
        expirationDate:
          certificateData.expirationDate > 0
            ? new Date(Number(certificateData.expirationDate) * 1000)
            : undefined,
        grade: certificateData.grade,
        skills: certificateData.skills,
        verified: certificateData.isActive,
        transactionHash: certificateData.transactionHash,
        blockNumber: Number(certificateData.blockNumber),
      };

      return {
        isValid: certificateData.isActive,
        certificate,
      };
    } catch (error) {
      console.error("Error verifying certificate:", error);
      return {
        isValid: false,
        error: error instanceof Error ? error.message : "Verification failed",
      };
    }
  }

  // Get certificates by recipient address
  async getCertificatesByRecipient(
    recipientAddress: string
  ): Promise<Certificate[]> {
    if (!this.contract) {
      throw new Error("Contract not initialized");
    }

    try {
      const certificateIds = await this.contract.getCertificatesByRecipient(
        recipientAddress
      );
      const certificates: Certificate[] = [];

      for (const id of certificateIds) {
        const result = await this.verifyCertificate(id);
        if (result.certificate) {
          certificates.push(result.certificate);
        }
      }

      return certificates;
    } catch (error) {
      console.error("Error getting certificates:", error);
      throw error;
    }
  }

  // Revoke a certificate
  async revokeCertificate(certificateId: string): Promise<string> {
    if (!this.contract || !this.signer) {
      throw new Error("Contract not initialized or wallet not connected");
    }

    try {
      const tx = await this.contract.revokeCertificate(certificateId);
      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      console.error("Error revoking certificate:", error);
      throw error;
    }
  }

  // Get current wallet address
  async getCurrentAddress(): Promise<string | null> {
    if (this.signer) {
      return await this.signer.getAddress();
    }
    return null;
  }

  // Check if wallet is connected
  isWalletConnected(): boolean {
    return this.provider !== null && this.signer !== null;
  }
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
