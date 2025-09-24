export const certificateContractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "certificateId",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
    ],
    name: "CertificateIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "certificateId",
        type: "string",
      },
    ],
    name: "CertificateRevoked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipientAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_recipientName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_recipientEmail",
        type: "string",
      },
      {
        internalType: "string",
        name: "_courseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_courseId",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "_skills",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "_grade",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_expirationDate",
        type: "uint256",
      },
    ],
    name: "issueCertificate",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_certificateId",
        type: "string",
      },
    ],
    name: "getCertificate",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "recipientAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "recipientName",
            type: "string",
          },
          {
            internalType: "string",
            name: "recipientEmail",
            type: "string",
          },
          {
            internalType: "string",
            name: "courseName",
            type: "string",
          },
          {
            internalType: "string",
            name: "courseId",
            type: "string",
          },
          {
            internalType: "string",
            name: "issuerName",
            type: "string",
          },
          {
            internalType: "address",
            name: "issuerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "issueDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expirationDate",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "grade",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "skills",
            type: "string[]",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
          {
            internalType: "string",
            name: "transactionHash",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "blockNumber",
            type: "uint256",
          },
        ],
        internalType: "struct CertificateRegistry.Certificate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
    ],
    name: "getCertificatesByRecipient",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_certificateId",
        type: "string",
      },
    ],
    name: "revokeCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_certificateId",
        type: "string",
      },
    ],
    name: "verifyCertificate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
