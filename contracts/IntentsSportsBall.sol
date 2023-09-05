// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";

contract IntentsSportsBall is PhatRollupAnchor, Ownable {
    uint256 minBetCost;
    uint256 sportysTake;
    event DollaDollaBillsYall(uint256 value);
    event ResponseReceived(uint reqId, string pair, uint256 value);
    event ErrorReceived(uint reqId, string pair, uint256 errno);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint => string) requests;
    uint nextRequest = 1;

    constructor(address phatAttestor) {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
        minBetCost = 0;
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function setMinBetCost(uint256 _minBetCost) public onlyOwner {
        minBetCost = _minBetCost;
    }

    function updateSportsBook() public onlyOwner {
        // assemble the request
        string memory update = "update";
        uint id = nextRequest;
        requests[id] = update;
        _pushMessage(abi.encode(id, update));
        nextRequest += 1;
    }

    function bet(string memory gameId) public payable nonReentrant {
        require(msg.value >= minBetCost, "Sent MATIC is below the minimum required");
        bytes memory bytesGameId = bytes(gameId);
        require(bytesGameId.length > 10, "Invalid Game ID length");
        // assemble the request
        uint id = nextRequest;
        requests[id] = gameId;
        sportysTake += msg.value;
        _pushMessage(abi.encode(id, gameId));
        nextRequest += 1;
    }

    function _onMessageReceived(bytes calldata action) internal override {
        require(action.length == 32 * 3, "cannot parse action");
        (uint respType, uint id, uint256 data) = abi.decode(
            action,
            (uint, uint, uint256)
        );
        if (respType == TYPE_RESPONSE) {
            emit ResponseReceived(id, requests[id], data);
            delete requests[id];
        } else if (respType == TYPE_ERROR) {
            emit ErrorReceived(id, requests[id], data);
            delete requests[id];
        }
    }

    function withdrawForSporty() public onlyOwner {
        require(sportysTake > 0, "Sporty's cut looks empty mate...");
        payable(msg.sender).transfer(sportysTake);
        emit DollaDollaBillsYall(sportysTake);
        sportysTake = 0;
    }
}
