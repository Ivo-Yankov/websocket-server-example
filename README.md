# Example usage of the Hedera Websocket Server

You will find an example script that deploys a simple contract and starts generating logs for it.
A subscription is created that listens for new logs.

To run the script against the local node clone the official [repo](https://github.com/hashgraph/hedera-local-node) and 
switch to the branch `342-ws-container`. After that run:

```shell
node cli.js start -d
```

To run the script against testnet or previewnet change the value of `defaultNetwork` in the `hardhat.config.js` and uncomment the corresponding websocket address in `scripts/subscribe.js`.


## To run the example:

```shell
npm ci
npx hardhat compile
node scripts/subscribe.js
```
