import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {
  Loader2,
  Shield,
  CheckCircle,
  XCircle,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { BlockchainService } from "../services/blockchainService";
import { MockBlockchainService } from "../services/mockBlockchainService";
import { Certificate, VerificationResult } from "../types/certificate";
import {
  formatAddress,
  formatDate,
  formatTransactionHash,
  getExplorerUrl,
  isCertificateExpired,
} from "../utils/helpers";

// Animated Attention Percentage Component
const AttentionPercentage: React.FC<{ percentage: number }> = ({
  percentage,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = percentage / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setAnimatedPercentage(Math.min(currentStep * stepValue, percentage));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible, percentage]);

  const getPercentageColor = (value: number) => {
    if (value >= 90) return "text-emerald-600";
    if (value >= 80) return "text-green-600";
    if (value >= 70) return "text-yellow-600";
    if (value >= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getPercentageGradient = (value: number) => {
    if (value >= 90) return "from-emerald-500 to-emerald-600";
    if (value >= 80) return "from-green-500 to-green-600";
    if (value >= 70) return "from-yellow-500 to-yellow-600";
    if (value >= 60) return "from-orange-500 to-orange-600";
    return "from-red-500 to-red-600";
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative group">
        <svg
          className="w-32 h-32 transform -rotate-90 drop-shadow-sm"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`${getPercentageColor(
              percentage
            )} transition-all duration-1000 ease-out drop-shadow-sm`}
            strokeLinecap="round"
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center transition-all duration-300 group-hover:scale-105">
            <div
              className={`text-3xl font-bold ${getPercentageColor(
                percentage
              )} drop-shadow-sm`}
            >
              {Math.round(animatedPercentage)}%
            </div>
            <div className="text-xs text-gray-500 mt-1 font-medium">
              Attention
            </div>
          </div>
        </div>

        {/* Enhanced glowing effect */}
        <div
          className={`absolute inset-0 rounded-full opacity-10 bg-gradient-to-r ${getPercentageGradient(
            percentage
          )}`}
          style={{
            animation: isVisible
              ? "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
              : "none",
            filter: "blur(8px)",
          }}
        />
      </div>

      <div className="ml-6 space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp
            className={`h-5 w-5 ${getPercentageColor(
              percentage
            )} transition-colors duration-300`}
          />
          <span className="font-semibold text-gray-700">
            Performance Metric
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
          This attention percentage indicates the recipient's engagement level
          and focus during the certification program.
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              percentage >= 80
                ? "bg-green-500"
                : percentage >= 60
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></div>
          <span>Verified via blockchain analytics</span>
        </div>
        <div className="text-xs text-gray-400 italic">
          {percentage >= 90 && "🌟 Outstanding Performance"}
          {percentage >= 80 && percentage < 90 && "🎯 Excellent Engagement"}
          {percentage >= 70 && percentage < 80 && "👍 Good Focus Level"}
          {percentage >= 60 && percentage < 70 && "⚠️ Moderate Attention"}
          {percentage < 60 && "📈 Room for Improvement"}
        </div>
      </div>
    </div>
  );
};

// Helper function to generate attention percentage based on grade
const generateAttentionPercentage = (grade?: string): number => {
  if (!grade) return 75; // Default percentage

  const gradeMap: { [key: string]: number } = {
    "A+": 96,
    A: 92,
    "A-": 88,
    "B+": 84,
    B: 80,
    "B-": 76,
    "C+": 72,
    C: 68,
    "C-": 64,
    "D+": 60,
    D: 55,
    F: 45,
  };

  return gradeMap[grade] || 75;
};

interface CertificateVerificationProps {
  blockchainService: BlockchainService | MockBlockchainService;
}

export const CertificateVerification: React.FC<
  CertificateVerificationProps
> = ({ blockchainService }) => {
  const [certificateId, setCertificateId] = useState<string>("");
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleVerification = async () => {
    if (!certificateId.trim()) {
      setError("Please enter a certificate ID");
      return;
    }

    setIsVerifying(true);
    setError("");
    setVerificationResult(null);

    try {
      const result = await blockchainService.verifyCertificate(certificateId);
      setVerificationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleVerification();
    }
  };

  const CertificateDetails: React.FC<{ certificate: Certificate }> = ({
    certificate,
  }) => {
    const isExpired = isCertificateExpired(certificate);

    return (
      <Card className="mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-green-700">
              Certificate Verified ✓
            </CardTitle>
            {isExpired && <Badge variant="destructive">Expired</Badge>}
          </div>
          <CardDescription>
            This certificate is authentic and verified on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700">Recipient</h4>
              <p className="text-gray-900">{certificate.recipientName}</p>
              <p className="text-sm text-gray-500">
                {certificate.recipientEmail}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700">Course</h4>
              <p className="text-gray-900">{certificate.courseName}</p>
              <p className="text-sm text-gray-500">
                ID: {certificate.courseId}
              </p>
            </div>
          </div>

          {/* Attention Percentage Section */}
          <div className="my-6">
            <AttentionPercentage
              percentage={generateAttentionPercentage(certificate.grade)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700">Issuer</h4>
              <p className="text-gray-900">{certificate.issuerName}</p>
              <p className="text-sm text-gray-500 font-mono">
                {formatAddress(certificate.issuerAddress)}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700">Issue Date</h4>
              <p className="text-gray-900">
                {formatDate(certificate.issueDate)}
              </p>
              {certificate.expirationDate && (
                <p className="text-sm text-gray-500">
                  Expires: {formatDate(certificate.expirationDate)}
                </p>
              )}
            </div>
          </div>

          {certificate.grade && (
            <div>
              <h4 className="font-semibold text-gray-700">Grade</h4>
              <Badge variant="secondary" className="mt-1">
                {certificate.grade}
              </Badge>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-700">Skills Certified</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {certificate.skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-700">Blockchain Details</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {certificate.transactionHash && (
                <div className="flex items-center gap-2">
                  <span>Transaction:</span>
                  <span className="font-mono">
                    {formatTransactionHash(certificate.transactionHash)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const url = getExplorerUrl(
                        certificate.transactionHash!,
                        11155111
                      ); // Default to Sepolia
                      window.open(url, "_blank");
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {certificate.blockNumber && (
                <div>
                  <span>Block Number: </span>
                  <span className="font-mono">{certificate.blockNumber}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">
                Certificate Verification
              </CardTitle>
              <CardDescription>
                Enter a certificate ID to verify its authenticity on the
                blockchain
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter certificate ID (e.g., ABC123XYZ456)"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleVerification}
              disabled={isVerifying}
              className="px-6"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {verificationResult && (
        <>
          {verificationResult.isValid && verificationResult.certificate ? (
            <CertificateDetails certificate={verificationResult.certificate} />
          ) : (
            <Card className="mt-4">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <XCircle className="h-8 w-8 text-red-500" />
                  <div>
                    <CardTitle className="text-xl text-red-700">
                      Certificate Not Valid
                    </CardTitle>
                    <CardDescription>
                      {verificationResult.error ||
                        "This certificate could not be verified on the blockchain"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
