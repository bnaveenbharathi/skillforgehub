import { Certificate } from "../types/certificate";

// Generate a unique certificate ID
export function generateCertificateId(
  recipientEmail: string,
  courseId: string,
  timestamp: number
): string {
  const data = `${recipientEmail}-${courseId}-${timestamp}`;
  return btoa(data).replace(/[+/=]/g, "").substring(0, 16);
}

// Format address for display
export function formatAddress(address: string): string {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Check if certificate is expired
export function isCertificateExpired(certificate: Certificate): boolean {
  if (!certificate.expirationDate) return false;
  return new Date() > certificate.expirationDate;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Ethereum address
export function isValidEthereumAddress(address: string): boolean {
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return ethAddressRegex.test(address);
}

// Convert skills array to comma-separated string
export function skillsToString(skills: string[]): string {
  return skills.join(", ");
}

// Convert comma-separated string to skills array
export function stringToSkills(skillsString: string): string[] {
  return skillsString
    .split(",")
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);
}

// Generate certificate QR code data
export function generateQRData(
  certificateId: string,
  verificationUrl?: string
): string {
  const baseUrl = verificationUrl || window.location.origin;
  return `${baseUrl}/verify/${certificateId}`;
}

// Hash data using browser's crypto API
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Format transaction hash for display
export function formatTransactionHash(txHash: string): string {
  if (!txHash) return "";
  return `${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 8)}`;
}

// Get blockchain explorer URL
export function getExplorerUrl(txHash: string, chainId: number): string {
  const explorers: { [key: number]: string } = {
    1: "https://etherscan.io/tx/", // Ethereum Mainnet
    11155111: "https://sepolia.etherscan.io/tx/", // Sepolia Testnet
    137: "https://polygonscan.com/tx/", // Polygon Mainnet
    80001: "https://mumbai.polygonscan.com/tx/", // Polygon Mumbai Testnet
  };

  const baseUrl = explorers[chainId] || explorers[11155111]; // Default to Sepolia
  return `${baseUrl}${txHash}`;
}

// Generate certificate metadata for IPFS
export function generateCertificateMetadata(certificate: Certificate): any {
  return {
    name: `${certificate.courseName} Certificate`,
    description: `Certificate for ${certificate.recipientName} completing ${certificate.courseName}`,
    image: "", // IPFS image hash would go here
    attributes: [
      {
        trait_type: "Recipient",
        value: certificate.recipientName,
      },
      {
        trait_type: "Course",
        value: certificate.courseName,
      },
      {
        trait_type: "Skills",
        value: certificate.skills.join(", "),
      },
      {
        trait_type: "Grade",
        value: certificate.grade || "N/A",
      },
      {
        trait_type: "Issue Date",
        value: formatDate(certificate.issueDate),
      },
      ...(certificate.expirationDate
        ? [
            {
              trait_type: "Expiration Date",
              value: formatDate(certificate.expirationDate),
            },
          ]
        : []),
    ],
  };
}

// Error handling utilities
export class BlockchainError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "BlockchainError";
  }
}

export function handleBlockchainError(error: any): string {
  if (error?.code === 4001) {
    return "Transaction rejected by user";
  }
  if (error?.code === -32603) {
    return "Internal JSON-RPC error";
  }
  if (error?.message?.includes("insufficient funds")) {
    return "Insufficient funds for transaction";
  }
  if (error?.message?.includes("user rejected")) {
    return "Transaction rejected by user";
  }
  return error?.message || "An unknown error occurred";
}
