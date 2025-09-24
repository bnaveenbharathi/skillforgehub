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
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";
import { Loader2, Award, Plus, X, CheckCircle } from "lucide-react";
import { BlockchainService } from "../services/blockchainService";
import { MockBlockchainService } from "../services/mockBlockchainService";
import { IssueCertificateRequest } from "../types/certificate";
import { isValidEmail, isValidEthereumAddress } from "../utils/helpers";

interface CertificateIssuanceProps {
  blockchainService: BlockchainService | MockBlockchainService;
}

export const CertificateIssuance: React.FC<CertificateIssuanceProps> = ({
  blockchainService,
}) => {
  const [formData, setFormData] = useState<IssueCertificateRequest>({
    recipientAddress: "",
    recipientName: "",
    recipientEmail: "",
    courseName: "",
    courseId: "",
    skills: [],
    grade: "",
    expirationDate: undefined,
  });

  const [skillInput, setSkillInput] = useState<string>("");
  const [isIssuing, setIsIssuing] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    setIsConnected(blockchainService.isWalletConnected());
  }, [blockchainService]);

  const handleInputChange = (
    field: keyof IssueCertificateRequest,
    value: string | string[] | Date | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const validateForm = (): string | null => {
    if (!formData.recipientAddress.trim())
      return "Recipient address is required";
    if (!isValidEthereumAddress(formData.recipientAddress))
      return "Invalid Ethereum address";
    if (!formData.recipientName.trim()) return "Recipient name is required";
    if (!formData.recipientEmail.trim()) return "Recipient email is required";
    if (!isValidEmail(formData.recipientEmail)) return "Invalid email address";
    if (!formData.courseName.trim()) return "Course name is required";
    if (!formData.courseId.trim()) return "Course ID is required";
    if (formData.skills.length === 0) return "At least one skill must be added";

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsIssuing(true);
    setError("");
    setSuccess("");

    try {
      const txHash = await blockchainService.issueCertificate(formData);
      setSuccess(
        `Certificate issued successfully! Transaction hash: ${txHash}`
      );

      // Reset form
      setFormData({
        recipientAddress: "",
        recipientName: "",
        recipientEmail: "",
        courseName: "",
        courseId: "",
        skills: [],
        grade: "",
        expirationDate: undefined,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to issue certificate"
      );
    } finally {
      setIsIssuing(false);
    }
  };

  const connectWallet = async () => {
    try {
      await blockchainService.connectWallet();
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">Issue Certificate</CardTitle>
                <CardDescription>
                  Connect your wallet to issue blockchain certificates
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button onClick={connectWallet} className="w-full">
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Issue Certificate</CardTitle>
              <CardDescription>
                Create a new blockchain-verified certificate
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipientAddress">
                    Recipient Ethereum Address *
                  </Label>
                  <Input
                    id="recipientAddress"
                    placeholder="0x..."
                    value={formData.recipientAddress}
                    onChange={(e) =>
                      handleInputChange("recipientAddress", e.target.value)
                    }
                    className="font-mono text-sm"
                  />
                </div>

                <div>
                  <Label htmlFor="recipientName">Recipient Name *</Label>
                  <Input
                    id="recipientName"
                    placeholder="John Doe"
                    value={formData.recipientName}
                    onChange={(e) =>
                      handleInputChange("recipientName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="recipientEmail">Recipient Email *</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.recipientEmail}
                    onChange={(e) =>
                      handleInputChange("recipientEmail", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="courseName">Course Name *</Label>
                  <Input
                    id="courseName"
                    placeholder="Advanced React Development"
                    value={formData.courseName}
                    onChange={(e) =>
                      handleInputChange("courseName", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="courseId">Course ID *</Label>
                  <Input
                    id="courseId"
                    placeholder="REACT-ADV-001"
                    value={formData.courseId}
                    onChange={(e) =>
                      handleInputChange("courseId", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="grade">Grade (Optional)</Label>
                  <Input
                    id="grade"
                    placeholder="A+, 95%, Pass, etc."
                    value={formData.grade}
                    onChange={(e) => handleInputChange("grade", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="skills">Skills *</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="skills"
                  placeholder="Add a skill (e.g., React, JavaScript)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                  className="flex-1"
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="expirationDate">Expiration Date (Optional)</Label>
              <Input
                id="expirationDate"
                type="date"
                value={
                  formData.expirationDate
                    ? formData.expirationDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleInputChange(
                    "expirationDate",
                    e.target.value ? new Date(e.target.value) : undefined
                  )
                }
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isIssuing} className="w-full">
              {isIssuing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Issuing Certificate...
                </>
              ) : (
                <>
                  <Award className="mr-2 h-4 w-4" />
                  Issue Certificate
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
