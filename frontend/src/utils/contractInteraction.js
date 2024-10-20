import { ethers } from 'ethers';
import Fundraiser from '../artifacts/contracts/Fundraiser.sol/Fundraiser.json';

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, Fundraiser.abi, signer);

const getFundraisers = async () => {
  // Here, you would call the method to get all active fundraisers from your contract
  const fundraisers = await contract.getFundraisers();
  return fundraisers;
};

export default { getFundraisers };
