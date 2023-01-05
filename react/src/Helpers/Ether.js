import { ethers } from 'ethers';
import config from '../Config/Config';

const provider = new ethers.providers.EtherscanProvider(
     config.etherNetwork,
     config.etherScanAPI
);

export const getTransactions = async () => {
     return await provider.getHistory(config.contractAddress);
};
export default provider;
