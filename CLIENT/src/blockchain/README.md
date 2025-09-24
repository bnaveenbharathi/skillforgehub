# Blockchain Certificate Verification System

A decentralized certificate verification system built on Ethereum blockchain using React, TypeScript, and Solidity smart contracts.

## 🚀 Features

### Certificate Verification

- ✅ Verify certificate authenticity on the blockchain
- ✅ Check certificate validity and expiration status
- ✅ View complete certificate details including skills and grades
- ✅ Access blockchain transaction history
- ✅ No wallet connection required for verification

### Certificate Issuance

- ✅ Issue tamper-proof certificates on blockchain
- ✅ Include recipient details and course information
- ✅ Add multiple skills and achievement data
- ✅ Set optional expiration dates
- ✅ Requires MetaMask wallet connection

### Security Features

- 🔐 Cryptographic proof of authenticity
- 🔐 Prevention of certificate forgery
- 🔐 Transparent audit trail
- 🔐 Certificate revocation capabilities
- 🔐 Time-stamped issuance records

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Shadcn/ui
- **Blockchain**: Ethereum, Solidity ^0.8.19
- **Web3 Integration**: Ethers.js v6
- **Icons**: Lucide React
- **QR Codes**: react-qr-code, qrcode

## 📦 Installation

1. **Install Dependencies**

   ```bash
   cd CLIENT
   npm install
   ```

2. **Required Dependencies**
   - `ethers` - Ethereum blockchain interaction
   - `react-qr-code` - QR code generation
   - `qrcode` - QR code utilities
   - `@types/qrcode` - TypeScript types

## 🔧 Configuration

### Smart Contract Deployment

1. **Deploy the Smart Contract**

   - Deploy `CertificateRegistry.sol` to your preferred Ethereum network
   - Note the deployed contract address

2. **Update Contract Address**
   ```typescript
   // In src/blockchain/components/BlockchainApp.tsx
   const DEFAULT_CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
   ```

### Network Configuration

The application supports multiple Ethereum networks:

- **Mainnet**: Ethereum Mainnet
- **Sepolia**: Sepolia Testnet (recommended for development)
- **Polygon**: Polygon Mainnet
- **Mumbai**: Polygon Mumbai Testnet

## 📱 Usage

### 1. Wallet Setup

- Install MetaMask browser extension
- Connect to your preferred Ethereum network
- Ensure you have some ETH for gas fees (if issuing certificates)

### 2. Certificate Verification

```typescript
import { CertificateVerification } from "./blockchain";

// Use the verification component
<CertificateVerification blockchainService={blockchainService} />;
```

### 3. Certificate Issuance

```typescript
import { CertificateIssuance } from "./blockchain";

// Use the issuance component (requires wallet connection)
<CertificateIssuance blockchainService={blockchainService} />;
```

### 4. Complete Application

```typescript
import { BlockchainApp } from "./blockchain";

// Use the complete blockchain application
<BlockchainApp />;
```

## 🏗 Project Structure

```
src/blockchain/
├── components/              # React components
│   ├── BlockchainApp.tsx   # Main application component
│   ├── CertificateVerification.tsx
│   ├── CertificateIssuance.tsx
│   └── WalletConnection.tsx
├── contracts/              # Smart contracts and ABIs
│   ├── CertificateRegistry.sol
│   └── certificateABI.ts
├── services/               # Blockchain services
│   └── blockchainService.ts
├── types/                  # TypeScript type definitions
│   └── certificate.ts
├── utils/                  # Utility functions
│   └── helpers.ts
└── index.ts               # Main exports
```

## 📋 Smart Contract Functions

### Public Functions

- `issueCertificate()` - Issue a new certificate
- `getCertificate()` - Get certificate by ID
- `verifyCertificate()` - Verify certificate validity
- `getCertificatesByRecipient()` - Get certificates by recipient
- `revokeCertificate()` - Revoke a certificate
- `getTotalCertificates()` - Get total certificate count

### Events

- `CertificateIssued` - Emitted when certificate is issued
- `CertificateRevoked` - Emitted when certificate is revoked

## 🎯 Integration with Main App

To integrate the blockchain system with your main SkillForgeHub application:

1. **Add Route**

   ```typescript
   // In your main App.tsx or router
   import { BlockchainApp } from "./blockchain";

   <Route path="/certificates" element={<BlockchainApp />} />;
   ```

2. **Add Navigation Link**

   ```typescript
   <Link to="/certificates">Certificate Verification</Link>
   ```

3. **Use Individual Components**
   ```typescript
   // Import specific components as needed
   import { CertificateVerification, BlockchainService } from "./blockchain";
   ```

## 🔍 Example Usage

### Verify a Certificate

1. Go to the "Verify Certificate" tab
2. Enter a certificate ID (e.g., "CERT-ABC123XYZ456")
3. Click "Verify"
4. View the certificate details if valid

### Issue a Certificate

1. Connect your MetaMask wallet
2. Go to the "Issue Certificate" tab
3. Fill in recipient details, course information, and skills
4. Click "Issue Certificate"
5. Confirm the transaction in MetaMask
6. Certificate will be created on the blockchain

## 🌐 Network Support

The application automatically detects the connected network and provides appropriate explorer links:

- **Ethereum**: etherscan.io
- **Sepolia**: sepolia.etherscan.io
- **Polygon**: polygonscan.com
- **Mumbai**: mumbai.polygonscan.com

## 🛡 Security Considerations

1. **Private Keys**: Never expose private keys in frontend code
2. **Input Validation**: All inputs are validated before blockchain interaction
3. **Gas Estimation**: Gas fees are estimated before transactions
4. **Error Handling**: Comprehensive error handling for failed transactions
5. **Network Verification**: Users are warned about unsupported networks

## 📄 License

This project is part of SkillForgeHub and follows the same licensing terms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **MetaMask Not Detected**

   - Install MetaMask browser extension
   - Refresh the page after installation

2. **Transaction Fails**

   - Check you have sufficient ETH for gas fees
   - Verify you're on the correct network
   - Try increasing gas limit

3. **Certificate Not Found**

   - Verify the certificate ID is correct
   - Ensure the certificate exists on the current network

4. **Network Issues**
   - Switch to a supported network (Sepolia recommended for testing)
   - Check network connectivity

## 📞 Support

For support and questions:

- Open an issue in the repository
- Contact the SkillForgeHub development team
- Check the documentation for common solutions
