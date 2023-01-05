import { ethers } from 'ethers';
import config from '../Config/Config';
import ABI from '../Data/Abi.json';
const win = window;
let provider;
let contract;

export const load = () => {
     provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     contract = new ethers.Contract(config.contractAddress, ABI, signer);
};

// const contract = new ethers.Contract(config.contractAddress, ABI, provider);

export const isMetamaskInstalled = () => {
     return win.ethereum && win.ethereum.isMetaMask;
};

export const isMetamaskEnabled = () => {
     return win.ethereum.isConnected();
};

export const isReady = () => {
     return isMetamaskInstalled();
};

export const getTransactions = async () => {
     const etherScanprovider = new ethers.providers.EtherscanProvider(
          config.etherNetwork,
          config.etherScanAPI
     );
     return await etherScanprovider.getHistory(config.contractAddress);
};

export const writeData = async (message) => {
     await contract.store(message);
};
