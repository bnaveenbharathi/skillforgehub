# Blockchain Certificate System - Deployment Guide

## Smart Contract Deployment

### Prerequisites

- Node.js and npm installed
- Hardhat or Truffle framework
- MetaMask wallet with testnet ETH
- Access to Ethereum testnet (Sepolia recommended)

### Quick Deployment with Hardhat

1. **Install Hardhat**

   ```bash
   npm install --save-dev hardhat
   npm install --save-dev @nomicfoundation/hardhat-toolbox
   ```

2. **Initialize Hardhat Project**

   ```bash
   npx hardhat init
   ```

3. **Configure Hardhat**
   Create `hardhat.config.js`:

   ```javascript
   require("@nomicfoundation/hardhat-toolbox");

   module.exports = {
     solidity: "0.8.19",
     networks: {
       sepolia: {
         url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
         accounts: ["YOUR_PRIVATE_KEY"],
       },
     },
   };
   ```

4. **Deploy Script**
   Create `scripts/deploy.js`:

   ```javascript
   async function main() {
     const CertificateRegistry = await ethers.getContractFactory(
       "CertificateRegistry"
     );
     const certificate = await CertificateRegistry.deploy(
       "SkillForgeHub Certificates",
       "SFHC"
     );

     await certificate.deployed();

     console.log("CertificateRegistry deployed to:", certificate.address);
   }

   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });
   ```

5. **Deploy Contract**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

### Environment Variables

Create `.env` file:

```bash
# Blockchain Configuration
VITE_CONTRACT_ADDRESS=your_deployed_contract_address_here
VITE_INFURA_PROJECT_ID=your_infura_project_id
VITE_DEFAULT_NETWORK=sepolia

# Application Configuration
VITE_APP_NAME=SkillForgeHub Certificate Verification
VITE_EXPLORER_BASE_URL=https://sepolia.etherscan.io
```

### Network Configuration

Update `src/blockchain/services/blockchainService.ts`:

```typescript
const contractAddress =
  import.meta.env.VITE_CONTRACT_ADDRESS || "YOUR_FALLBACK_ADDRESS";
```

### Frontend Deployment

1. **Build Application**

   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify**
   - Connect your repository
   - Set environment variables
   - Deploy

### Testing

1. **Local Testing**

   ```bash
   npx hardhat node
   npm run dev
   ```

2. **Testnet Testing**
   - Get Sepolia ETH from faucet
   - Connect MetaMask to Sepolia
   - Test certificate issuance and verification

### Production Checklist

- [ ] Smart contract audited
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Error monitoring setup
- [ ] Backup wallet secured
- [ ] Gas optimization completed
- [ ] Frontend performance optimized

### Cost Estimation

Approximate gas costs on Ethereum:

- Deploy contract: ~2,500,000 gas
- Issue certificate: ~150,000 gas
- Verify certificate: 0 gas (view function)
- Revoke certificate: ~50,000 gas

### Maintenance

1. **Monitor Contract**

   - Track gas usage
   - Monitor for errors
   - Update frontend if needed

2. **Security Updates**
   - Keep dependencies updated
   - Monitor for vulnerabilities
   - Regular security audits

### Support Networks

Currently supported networks:

- Ethereum Mainnet (Chain ID: 1)
- Sepolia Testnet (Chain ID: 11155111) - Recommended for development
- Polygon Mainnet (Chain ID: 137)
- Mumbai Testnet (Chain ID: 80001)
