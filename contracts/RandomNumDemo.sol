// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVRNPort {
    function requestRandomNumber() external payable returns (uint256);

    function getRandomNumber(uint256 requestId) external view returns (uint256);
}

contract NumberGuessingGame {
    address public owner;
    uint256 public targetNumber;
    uint256 public guessCount;
    bool public gameEnded;

    IVRNPort private _vrnPort;
    uint256 private _currentRequestId;

    constructor(address vrnPortAddress) {
        owner = msg.sender;
        _vrnPort = IVRNPort(vrnPortAddress);
        gameEnded = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier gameActive() {
        require(!gameEnded, "The game is not active");
        _;
    }

    event GameStarted(uint256 requestId);
    event NumberGuessed(uint256 guess);
    event GameEnded(uint256 targetNumber);

    function startGame() external onlyOwner {
        require(
            gameEnded,
            "The previous game must end before starting a new one"
        );
        _currentRequestId = _vrnPort.requestRandomNumber{value: 2 wei}();
        gameEnded = false;
        emit GameStarted(_currentRequestId);
    }

    function makeGuess(uint256 guess) external gameActive {
        require(guess > 0 && guess <= 100, "Guess must be between 1 and 100");
        guessCount++;
        emit NumberGuessed(guess);

        uint256 randomNumber = _vrnPort.getRandomNumber(_currentRequestId);
        if (randomNumber == 0) {
            // Random number not set yet, wait for the next guess
            return;
        }

        targetNumber = (randomNumber % 100) + 1;
        gameEnded = true;
        emit GameEnded(targetNumber);
    }
}
