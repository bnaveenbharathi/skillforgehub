import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";
import {
  Wallet,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { BlockchainService } from "../services/blockchainService";
import { MockBlockchainService } from "../services/mockBlockchainService";
import { WalletState } from "../types/certificate";
import { formatAddress } from "../utils/helpers";

interface WalletConnectionProps {
  blockchainService: BlockchainService | MockBlockchainService;
  onConnectionChange: (connected: boolean) => void;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({
  blockchainService,
  onConnectionChange,
}) => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
  });
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDisconnect = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      chainId: null,
      provider: null,
    });
    onConnectionChange(false);
  }, [onConnectionChange]);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      if (blockchainService.isWalletConnected()) {
        const address = await blockchainService.getCurrentAddress();
        if (address) {
          setWalletState({
            isConnected: true,
            address,
            chainId: 11155111, // Default to Sepolia for now
            provider: null,
          });
          onConnectionChange(true);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          handleDisconnect();
        } else {
          setWalletState((prev) => ({
            ...prev,
            address: accounts[0],
          }));
        }
      });

      window.ethereum.on("chainChanged", (chainId: string) => {
        setWalletState((prev) => ({
          ...prev,
          chainId: parseInt(chainId, 16),
        }));
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, [blockchainService, onConnectionChange, handleDisconnect]);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError("");

    try {
      const state = await blockchainService.connectWallet();
      setWalletState(state);
      onConnectionChange(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
      onConnectionChange(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const copyAddress = () => {
    if (walletState.address) {
      navigator.clipboard.writeText(walletState.address);
    }
  };

  const getNetworkName = (chainId: number): string => {
    const networks: { [key: number]: string } = {
      1: "Ethereum Mainnet",
      11155111: "Sepolia Testnet",
      137: "Polygon Mainnet",
      80001: "Mumbai Testnet",
    };
    return networks[chainId] || `Unknown Network (${chainId})`;
  };

  const getNetworkStatus = (
    chainId: number
  ): "default" | "destructive" | "outline" | "secondary" => {
    // Testnet chains are preferred for development
    if ([11155111, 80001].includes(chainId)) return "secondary";
    // Mainnet chains
    if ([1, 137].includes(chainId)) return "outline";
    // Unknown networks
    return "destructive";
  };

  if (!window.ethereum) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8 text-gray-400" />
            <div>
              <CardTitle>MetaMask Required</CardTitle>
              <CardDescription>
                You need MetaMask installed to use blockchain features
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>MetaMask Not Detected</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <span>
                Please install MetaMask to continue with blockchain certificate
                verification.
              </span>
              <Button variant="outline" asChild className="w-fit">
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Install MetaMask
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wallet
            className={`h-8 w-8 ${
              walletState.isConnected ? "text-green-600" : "text-gray-400"
            }`}
          />
          <div>
            <CardTitle>
              Wallet Connection
              {walletState.isConnected && (
                <CheckCircle className="inline ml-2 h-5 w-5 text-green-600" />
              )}
            </CardTitle>
            <CardDescription>
              {walletState.isConnected
                ? "Connected and ready"
                : "Connect your wallet to continue"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!walletState.isConnected ? (
          <div className="space-y-4">
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Connected Account
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-mono text-green-700">
                    {formatAddress(walletState.address!)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>

            {walletState.chainId && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network:</span>
                <Badge variant={getNetworkStatus(walletState.chainId)}>
                  {getNetworkName(walletState.chainId)}
                </Badge>
              </div>
            )}

            {walletState.chainId &&
              ![11155111, 80001].includes(walletState.chainId) && (
                <Alert variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Network Notice</AlertTitle>
                  <AlertDescription>
                    For testing, consider switching to Sepolia or Mumbai
                    testnet.
                  </AlertDescription>
                </Alert>
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
