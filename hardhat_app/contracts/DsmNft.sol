//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DsmNft is ERC721Enumerable, Ownable {

      using Strings for uint256;

      /**
       * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
       * token will be the concatenation of the `baseURI` and the `tokenId`.
       */
      string _baseTokenURI;

      // _price is the price of one Crypto Dev NFT
      uint256 public _price = 0.001 ether;

      // _paused is used to pause the contract in case of an emergency
      bool public _paused;

      // max number of CryptoDevs
      uint256 public maxTokenIds = 10;

      // total number of tokenIds minted
      uint256 public tokenIds;

      // to track the number of NFTs with each address
      mapping(address => uint256[]) public nftTracker;

      modifier onlyWhenNotPaused {
          require(!_paused, "Contract currently paused");
          _;
      }

      /**
       * @dev ERC721 constructor takes in a `name` and a `symbol` to the token collection.
       * name in our case is `Crypto Devs` and symbol is `CD`.
       * Constructor for Crypto Devs takes in the baseURI to set _baseTokenURI for the collection.
       * It also initializes an instance of whitelist interface.
       */
      constructor (string memory baseURI) ERC721("DSM Tokens", "DSM") {
          _baseTokenURI = baseURI;
      }

      function mint() public payable onlyWhenNotPaused {
          require(nftTracker[msg.sender].length <= 2, "NFT limit exceeded");
          require(tokenIds < maxTokenIds, "Exceed maximum Crypto Devs supply");
          require(msg.value >= _price, "Ether sent is not correct");
          tokenIds += 1;
          nftTracker[msg.sender].push(tokenIds);
          _safeMint(msg.sender, tokenIds);
      }

      function _baseURI() internal view virtual override returns (string memory) {
          return _baseTokenURI;
      }

      function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
          require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

          string memory baseURI = _baseURI();
          // Here it checks if the length of the baseURI is greater than 0, if it is return the baseURI and attach
          // the tokenId and `.json` to it so that it knows the location of the metadata json file for a given 
          // tokenId stored on IPFS
          // If baseURI is empty return an empty string
          return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
      }

      function withdraw() public onlyOwner  {
          address _owner = owner();
          uint256 amount = address(this).balance;
          (bool sent, ) =  _owner.call{value: amount}("");
          require(sent, "Failed to send Ether");
      }

      // Function to receive Ether. msg.data must be empty
      receive() external payable {}

      // Fallback function is called when msg.data is not empty
      fallback() external payable {}
}