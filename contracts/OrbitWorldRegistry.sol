// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract OrbitWorldRegistry is ERC721URIStorage, Ownable {
    struct WorldRecord { uint256 tokenId; bytes32 worldIdHash; bytes32 stateHash; string metadataURI; uint64 createdAt; uint64 updatedAt; uint32 version; }
    uint256 private _nextTokenId = 1;
    mapping(bytes32 => uint256) public tokenByWorldId;
    mapping(uint256 => WorldRecord) private _records;
    event WorldRegistered(uint256 indexed tokenId, bytes32 indexed worldIdHash, address indexed owner, bytes32 stateHash, string metadataURI);
    event WorldEvolved(uint256 indexed tokenId, bytes32 previousStateHash, bytes32 newStateHash, uint32 version);
    error WorldAlreadyRegistered(); error Unauthorized(); error VersionMismatch(); error EmptyMetadata();
    constructor(address initialOwner) ERC721("ORBIT AI World", "ORBIT") Ownable(initialOwner) {}
    function registerWorld(bytes32 worldIdHash, bytes32 stateHash, string calldata metadataURI) external returns (uint256 tokenId) {
        if (tokenByWorldId[worldIdHash] != 0) revert WorldAlreadyRegistered(); if (bytes(metadataURI).length == 0) revert EmptyMetadata();
        tokenId = _nextTokenId++; _safeMint(msg.sender, tokenId); _setTokenURI(tokenId, metadataURI); tokenByWorldId[worldIdHash] = tokenId;
        _records[tokenId] = WorldRecord(tokenId, worldIdHash, stateHash, metadataURI, uint64(block.timestamp), uint64(block.timestamp), 1);
        emit WorldRegistered(tokenId, worldIdHash, msg.sender, stateHash, metadataURI);
    }
    function updateWorldState(uint256 tokenId, bytes32 newStateHash, uint32 expectedVersion) external {
        if (!_isAuthorized(ownerOf(tokenId), msg.sender, tokenId)) revert Unauthorized(); WorldRecord storage record = _records[tokenId]; if (record.version != expectedVersion) revert VersionMismatch();
        bytes32 previous = record.stateHash; record.stateHash = newStateHash; record.version += 1; record.updatedAt = uint64(block.timestamp); emit WorldEvolved(tokenId, previous, newStateHash, record.version);
    }
    function worldStateHash(uint256 tokenId) external view returns (bytes32) { _requireOwned(tokenId); return _records[tokenId].stateHash; }
    function getWorldMetadata(uint256 tokenId) external view returns (WorldRecord memory) { _requireOwned(tokenId); return _records[tokenId]; }
}
