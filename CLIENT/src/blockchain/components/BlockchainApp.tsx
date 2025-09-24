import * as React from "react";
import { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Shield, Award, Wallet as WalletIcon } from "lucide-react";
import { MockBlockchainService } from "../services/mockBlockchainService";
import { CertificateVerification } from "./CertificateVerification";
import { CertificateIssuance } from "./CertificateIssuance";
import { WalletConnection } from "./WalletConnection";

export const BlockchainApp: React.FC = () => {
  const [blockchainService] = useState(() => new MockBlockchainService());
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("verify");

  useEffect(() => {
    setIsWalletConnected(blockchainService.isWalletConnected());
  }, [blockchainService]);

  const handleWalletConnectionChange = (connected: boolean) => {
    setIsWalletConnected(connected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Blockchain Certificate Verification
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Issue, verify, and manage educational certificates on the
            blockchain. Ensure authenticity and prevent fraud with decentralized
            verification.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <WalletConnection
            blockchainService={blockchainService}
            onConnectionChange={handleWalletConnectionChange}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="verify" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Verify Certificate
            </TabsTrigger>
            <TabsTrigger value="issue" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Issue Certificate
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <WalletIcon className="h-4 w-4" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-4">
            <CertificateVerification blockchainService={blockchainService} />
          </TabsContent>

          <TabsContent value="issue" className="space-y-4">
            {isWalletConnected ? (
              <CertificateIssuance blockchainService={blockchainService} />
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WalletIcon className="h-5 w-5" />
                    Wallet Connection Required
                  </CardTitle>
                  <CardDescription>
                    Connect your wallet to issue new certificates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    To issue certificates, you need to connect your MetaMask
                    wallet. This ensures proper authentication and blockchain
                    transaction signing.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    How Verification Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Our blockchain certificate verification system uses smart
                    contracts to store certificate data immutably.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Certificates are stored with cryptographic hashes</li>
                    <li>• Each certificate has a unique ID</li>
                    <li>• Verification is instant and tamper-proof</li>
                    <li>• No central authority required</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    Certificate Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Our certificates include comprehensive metadata and security
                    features.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Student and institution information</li>
                    <li>• Issue and expiration dates</li>
                    <li>• Grade and achievement level</li>
                    <li>• Blockchain transaction records</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <WalletIcon className="h-5 w-5 text-purple-600" />
                    MetaMask Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Connect your MetaMask wallet to interact with the blockchain
                    and manage certificates.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Secure wallet connection</li>
                    <li>• Transaction signing</li>
                    <li>• Gas fee management</li>
                    <li>• Network switching support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security & Trust</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Built on blockchain technology for maximum security and
                    transparency.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Immutable certificate records</li>
                    <li>• Cryptographic proof of authenticity</li>
                    <li>• Decentralized verification</li>
                    <li>• No single point of failure</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
