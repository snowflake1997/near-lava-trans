const nearAPI = require('near-api-js');

const nearTrans = (senderAddr,receiverAddr,senderPrivateKey,sendNum,lavaRpcUrl) {
	// 连接到自定义的RPC节点
const nearConfig = {
  networkId: 'lavaNode',
  nodeUrl: lavaRpcUrl,
  walletUrl: 'https://wallet.near.org',
  helperUrl: 'https://helper.near.org',
  explorerUrl: 'https://explorer.near.org',
};

const senderKey = nearAPI.utils.KeyPair.fromString(senderPrivateKey);

const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
await keyStore.setKey(nearConfig.networkId, senderAddr, senderKey);

const near = await nearAPI.connect({
    ...nearConfig,
    keyStore,
  });
  const sendNearNum = nearAPI.utils.format.parseNearAmount(sendNum)
  const senderAccount = await near.account(senderAddr);
  return await senderAccount.sendMoney(
		receiverAddr, // receiver account
		sendNearNum // amount in yoctoNEAR
  );
}

exports.nearTrans = nearTrans