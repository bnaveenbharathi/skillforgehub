// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CertificateRegistry
 * @dev Smart contract for issuing and verifying educational certificates on blockchain
 * @author SkillForgeHub Team
 */
contract CertificateRegistry {
    
    struct Certificate {
        address recipientAddress;
        string recipientName;
        string recipientEmail;
        string courseName;
        string courseId;
        string issuerName;
        address issuerAddress;
        uint256 issueDate;
        uint256 expirationDate; // 0 if no expiration
        string grade;
        string[] skills;
        bool isActive;
        string transactionHash;
        uint256 blockNumber;
    }
    
    // Mapping from certificate ID to certificate data
    mapping(string => Certificate) private certificates;
    
    // Mapping from recipient address to array of certificate IDs
    mapping(address => string[]) private recipientCertificates;
    
    // Mapping from issuer address to array of certificate IDs
    mapping(address => string[]) private issuerCertificates;
    
    // Array of all certificate IDs for enumeration
    string[] private allCertificateIds;
    
    // Mapping to check if certificate ID exists
    mapping(string => bool) private certificateExists;
    
    // Contract metadata
    string public name;
    string public symbol;
    address public owner;
    
    // Events
    event CertificateIssued(
        string indexed certificateId,
        address indexed recipient,
        address indexed issuer
    );
    
    event CertificateRevoked(
        string indexed certificateId
    );
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier certificateNotExists(string memory _certificateId) {
        require(!certificateExists[_certificateId], "Certificate already exists");
        _;
    }
    
    modifier certificateExistsModifier(string memory _certificateId) {
        require(certificateExists[_certificateId], "Certificate does not exist");
        _;
    }
    
    modifier onlyIssuerOrOwner(string memory _certificateId) {
        require(
            msg.sender == certificates[_certificateId].issuerAddress || 
            msg.sender == owner,
            "Only certificate issuer or contract owner can perform this action"
        );
        _;
    }
    
    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
        owner = msg.sender;
    }
    
    /**
     * @dev Issue a new certificate
     * @param _recipientAddress Address of the certificate recipient
     * @param _recipientName Name of the recipient
     * @param _recipientEmail Email of the recipient
     * @param _courseName Name of the course
     * @param _courseId Unique identifier for the course
     * @param _skills Array of skills certified
     * @param _grade Grade or achievement level
     * @param _expirationDate Expiration timestamp (0 for no expiration)
     * @return certificateId Generated certificate ID
     */
    function issueCertificate(
        address _recipientAddress,
        string memory _recipientName,
        string memory _recipientEmail,
        string memory _courseName,
        string memory _courseId,
        string[] memory _skills,
        string memory _grade,
        uint256 _expirationDate
    ) external returns (string memory) {
        
        // Generate unique certificate ID
        string memory certificateId = generateCertificateId(
            _recipientEmail,
            _courseId,
            block.timestamp
        );
        
        require(!certificateExists[certificateId], "Certificate ID already exists");
        
        // Create certificate
        certificates[certificateId] = Certificate({
            recipientAddress: _recipientAddress,
            recipientName: _recipientName,
            recipientEmail: _recipientEmail,
            courseName: _courseName,
            courseId: _courseId,
            issuerName: "SkillForgeHub", // Can be made dynamic
            issuerAddress: msg.sender,
            issueDate: block.timestamp,
            expirationDate: _expirationDate,
            grade: _grade,
            skills: _skills,
            isActive: true,
            transactionHash: "", // Will be set after transaction
            blockNumber: block.number
        });
        
        // Update mappings
        certificateExists[certificateId] = true;
        recipientCertificates[_recipientAddress].push(certificateId);
        issuerCertificates[msg.sender].push(certificateId);
        allCertificateIds.push(certificateId);
        
        // Emit event
        emit CertificateIssued(certificateId, _recipientAddress, msg.sender);
        
        return certificateId;
    }
    
    /**
     * @dev Get certificate data by ID
     * @param _certificateId Certificate ID to lookup
     * @return Certificate data
     */
    function getCertificate(string memory _certificateId) 
        external 
        view 
        certificateExistsModifier(_certificateId)
        returns (Certificate memory) 
    {
        return certificates[_certificateId];
    }
    
    /**
     * @dev Verify if a certificate is valid and active
     * @param _certificateId Certificate ID to verify
     * @return Boolean indicating if certificate is valid
     */
    function verifyCertificate(string memory _certificateId) 
        external 
        view 
        returns (bool) 
    {
        if (!certificateExists[_certificateId]) {
            return false;
        }
        
        Certificate memory cert = certificates[_certificateId];
        
        // Check if certificate is active
        if (!cert.isActive) {
            return false;
        }
        
        // Check expiration (0 means no expiration)
        if (cert.expirationDate > 0 && block.timestamp > cert.expirationDate) {
            return false;
        }
        
        return true;
    }
    
    /**
     * @dev Get all certificates for a recipient
     * @param _recipient Recipient address
     * @return Array of certificate IDs
     */
    function getCertificatesByRecipient(address _recipient) 
        external 
        view 
        returns (string[] memory) 
    {
        return recipientCertificates[_recipient];
    }
    
    /**
     * @dev Get all certificates issued by an address
     * @param _issuer Issuer address
     * @return Array of certificate IDs
     */
    function getCertificatesByIssuer(address _issuer) 
        external 
        view 
        returns (string[] memory) 
    {
        return issuerCertificates[_issuer];
    }
    
    /**
     * @dev Revoke a certificate (only by issuer or owner)
     * @param _certificateId Certificate ID to revoke
     */
    function revokeCertificate(string memory _certificateId) 
        external 
        certificateExistsModifier(_certificateId)
        onlyIssuerOrOwner(_certificateId)
    {
        certificates[_certificateId].isActive = false;
        emit CertificateRevoked(_certificateId);
    }
    
    /**
     * @dev Get total number of certificates issued
     * @return Total certificate count
     */
    function getTotalCertificates() external view returns (uint256) {
        return allCertificateIds.length;
    }
    
    /**
     * @dev Get certificate ID by index (for enumeration)
     * @param _index Index in the certificates array
     * @return Certificate ID
     */
    function getCertificateIdByIndex(uint256 _index) 
        external 
        view 
        returns (string memory) 
    {
        require(_index < allCertificateIds.length, "Index out of bounds");
        return allCertificateIds[_index];
    }
    
    /**
     * @dev Generate unique certificate ID
     * @param _email Recipient email
     * @param _courseId Course ID
     * @param _timestamp Timestamp
     * @return Generated certificate ID
     */
    function generateCertificateId(
        string memory _email,
        string memory _courseId,
        uint256 _timestamp
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(
            "CERT-",
            _substring(keccak256(abi.encodePacked(_email, _courseId, _timestamp)), 0, 8)
        ));
    }
    
    /**
     * @dev Extract substring from bytes32 hash
     * @param _data Input bytes32 data
     * @param _start Start position
     * @param _length Length to extract
     * @return Extracted string
     */
    function _substring(
        bytes32 _data,
        uint256 _start,
        uint256 _length
    ) internal pure returns (string memory) {
        bytes memory result = new bytes(_length);
        for (uint256 i = 0; i < _length; i++) {
            result[i] = _data[_start + i];
        }
        return string(result);
    }
    
    /**
     * @dev Transfer contract ownership (only current owner)
     * @param _newOwner New owner address
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner cannot be zero address");
        owner = _newOwner;
    }
    
    /**
     * @dev Update contract metadata (only owner)
     * @param _name New contract name
     * @param _symbol New contract symbol
     */
    function updateMetadata(string memory _name, string memory _symbol) 
        external 
        onlyOwner 
    {
        name = _name;
        symbol = _symbol;
    }
}