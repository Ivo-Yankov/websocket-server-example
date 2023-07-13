const hre = require("hardhat");
const {ethers} = require('ethers');

// const WS_RELAY_URL = `ws://localhost:8546`;
const WS_RELAY_URL = `wss://testnet.hashio.io/ws`;
// const WS_RELAY_URL = `wss://previewnet.hashio.io/ws`;

const subscribe = async (contractAddress) => {
  const provider = await new ethers.WebSocketProvider(WS_RELAY_URL);

  provider.websocket.on('error', (error) => {
    console.error(`Websocket error`);
    console.error(error);
  })

  provider.websocket.on('close', (code, message) => {
    console.error(`Websocket closed: ${code}`);
    console.error(message);
  })

  provider.on({address: contractAddress}, (event) => {
    console.log(`received log data for: ${event.transactionHash}`);
  });

  await new Promise(r => setTimeout(r, 2000));
}

async function main() {
  const Logger = await hre.ethers.getContractFactory("Logs");
  let logger = await Logger.deploy({gasLimit: 1000000});
  await logger.waitForDeployment();
  const address = logger.target;
  logger = await hre.ethers.getContractAt("Logs", address);

  await subscribe(logger.target);

  setInterval(async () => {
    const tx = await logger.log0(10, {gasLimit: 100000});
    return tx.wait();
  }, 3000);

  process.stdin.resume(); // Wait for user input
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
