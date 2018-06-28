pragma solidity 0.4.24;
// We have to specify what version of compiler this code will compile with

contract Poker {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is player name stored as type bytes32 and value is
  an unsigned integer to store the bet
  */

  mapping (bytes32 => uint8) public betsPlaced;

  // maps player names to whether they have folded. True = folded
  mapping (bytes32 => bool) public foldedPlayers;

  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of players
  */

  bytes32[] public playerList;
  //bytes32[] public playerListCopy;
  uint8 public totalPot;
  uint8 public highestBet;
  uint8 public maxBetAmount;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of players who will be contesting in the election
  */
  function Poker(bytes32[] playerNames) public {
    playerList = playerNames;
    totalPot = 0;
    highestBet = 0;
    maxBetAmount = 100;
    //playerListCopy = copyArray(playerNames);
  }

  // This function returns the total bets a player has made so far
  function totalBetFor(bytes32 player) view public returns (uint8) {
    require(validPlayer(player));
    return betsPlaced[player];
  }

  // returns the total pot size
  function totalPotSize() view public returns (uint8) {
    return totalPot;
  }

  // This function increments the bet for the specified player. This
  // is equivalent to casting a bet
  function playerBet(bytes32 player, uint8 betAmount) public {
    require(validPlayer(player));
    if (betAmount <= maxBetAmount) {
      betsPlaced[player] += betAmount;
      totalPot += betAmount;
    }
    if (betsPlaced[player] > highestBet) {
      highestBet = betsPlaced[player];
    }
  }

  function validPlayer(bytes32 player) view public returns (bool) {
    if (foldedPlayers[player] == true) {
      return false;
    }
    for(uint i = 0; i < playerList.length; i++) {
      if (playerList[i] == player) {
        return true;
      }
    }
    return false;
  }

  function clearPot() public {
    totalPot = 0;
  }

  // need to clear players individually because gas limit doesn't allow for loops
  function clearPlayerBet(bytes32 player) public {
    betsPlaced[player] = 0;
    foldedPlayers[player] = false;
  }

  // type in a name + press call
  function playerCall(bytes32 player) public {
    uint8 highest = highestBet;
    uint8 currBet = betsPlaced[player];
    totalPot += highest - currBet;
    betsPlaced[player] = highest;
  }

  // type in a name and press fold
  function playerFold(bytes32 player) public {
    foldedPlayers[player] = true;
  }

  // type in a name and press check
  function playerCheck(bytes32 player) public {

  }
}
