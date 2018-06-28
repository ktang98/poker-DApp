/** BELOW IS JUST TO BE DONE ONE-OFF IN CONSOLE TO DEPLOY CONTRACT
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

code = fs.readFileSync('Voting.sol').toString()
solc = require('solc')
compiledCode = solc.compile(code)

// returns a bytecode which is eventually deployed to blockchain
// returns an ABI (interface of the contract) which tells the contract user
//      which methods are available

abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode

// deploy the contract to the blockchain
// note: in 'from', we're just chosing a random account to be owner but in a
//      live blockchain, will need to have ownership of that account
deployedContract = VotingContract.new(['Rama','Nick','Jose'],
                  {data: byteCode, from: web3.eth.accounts[0], gas: 4700000})

// the address allows you to interact with YOUR blockchain
contractInstance = VotingContract.at(deployedContract.address) */
//var Web3 = require('web3')
if (typeof web3 !== 'undefined') {
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
abi = [{"constant":false,"inputs":[{"name":"player","type":"bytes32"}],"name":"playerFold","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"player","type":"bytes32"}],"name":"playerCall","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"clearPot","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalPot","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"player","type":"bytes32"}],"name":"playerCheck","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"highestBet","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalPotSize","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"player","type":"bytes32"}],"name":"playerBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"bytes32"}],"name":"totalBetFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"player","type":"bytes32"}],"name":"clearPlayerBet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"player","type":"bytes32"}],"name":"validPlayer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"playerList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"betsPlaced","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"foldedPlayers","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"playerNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
PokerContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = PokerContract.at('0xcce9fc7836ede418240eb161c6e63b0a032f30af');
players = {"Sai": "player-1", "Kevin": "player-2", "Arno": "player-3"}

function playerBet() {
  console.log('Bet Placed')
  playerName = $("#player").val();
  contractInstance.playerBet(playerName, {from: web3.eth.accounts[0]}, function() {
    let div_id = players[playerName];
    $("#" + div_id).html(contractInstance.totalBetFor.call(playerName).toString());
    $("#" + "total-pot").html(contractInstance.totalPotSize.call().toString());
    });
}

function playerCall() {
  console.log('Call')
  playerName = $('#player').val();
  contractInstance.playerCall(playerName, {from: web3.eth.accounts[0]}, function() {
    let div_id = players[playerName];
    $("#" + div_id).html(contractInstance.totalBetFor.call(playerName).toString());
    $("#" + "total-pot").html(contractInstance.totalPotSize.call().toString());
  });
}

function playerFold() {
  console.log('fold')
  playerName = $('#player').val();

  contractInstance.playerFold(playerName, {from: web3.eth.accounts[0]}, function() {
    let div_id = players[playerName];
    $("#" + div_id).html(contractInstance.totalBetFor.call(playerName).toString());
    $("#" + "total-pot").html(contractInstance.totalPotSize.call().toString());
  });

}

function playerCheck() {
  console.log('fold')
  playerName = $('#player').val();

  contractInstance.playerCheck(playerName, {from: web3.eth.accounts[0]}, function() {
    let div_id = players[playerName];
    $("#" + div_id).html(contractInstance.totalBetFor.call(playerName).toString());
    $("#" + "total-pot").html(contractInstance.totalPotSize.call().toString());
  });

}

function clearPlayerBet() {
  console.log('fold')
  playerName = $('#player').val();

  contractInstance.clearPlayerBet(playerName, {from: web3.eth.accounts[0]}, function() {
    let div_id = players[playerName];
    $("#" + div_id).html(contractInstance.totalBetFor.call(playerName).toString());
    $("#" + "total-pot").html(contractInstance.totalPotSize.call().toString());
  });
}

function clearPot() {
  console.log('Round Ended')
  contractInstance.clearPot({from: web3.eth.accounts[0]}, function() {
    $("#" + "total-pot").html(contractInstance.totalPotSize.call().toString());
  });
}

$(document).ready(function() {
  playerNames = Object.keys(players);
  for (var i = 0; i < playerNames.length; i++) {
    let name = playerNames[i];
    let val = contractInstance.totalBetFor.call(name).toString()
    $("#" + players[name]).html(val);
  }
});
