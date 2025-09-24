// Main Components
export { BlockchainApp } from "./components/BlockchainApp";
export { CertificateVerification } from "./components/CertificateVerification";
export { CertificateIssuance } from "./components/CertificateIssuance";
export { WalletConnection } from "./components/WalletConnection";

// Services
export { BlockchainService } from "./services/blockchainService";

// Types
export type {
  Certificate,
  CertificateMetadata,
  VerificationResult,
  IssueCertificateRequest,
  WalletState,
} from "./types/certificate";

// Utils
export {
  generateCertificateId,
  formatAddress,
  formatDate,
  isCertificateExpired,
  isValidEmail,
  isValidEthereumAddress,
  skillsToString,
  stringToSkills,
  generateQRData,
  hashData,
  formatTransactionHash,
  getExplorerUrl,
  generateCertificateMetadata,
  BlockchainError,
  handleBlockchainError,
} from "./utils/helpers";

// Smart Contract ABI
export { certificateContractABI } from "./contracts/certificateABI";
