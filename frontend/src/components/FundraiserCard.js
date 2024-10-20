import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractInteraction from '../utils/contractInteraction';

const FundraiserCard = ({ fundraiser }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleDonate = async () => {
    try {
      const amountInWei = ethers.utils.parseEther(donationAmount);
      await contractInteraction.donateToFundraiser(fundraiser.address, amountInWei);
      setDonationSuccess(true);
    } catch (error) {
      console.error("Donation failed:", error);
      setDonationSuccess(false);
    }
  };

  return (
    <div className="fundraiser-card">
      <h3>{fundraiser.name}</h3>
      <p>{fundraiser.description}</p>
      <p><strong>Goal:</strong> {ethers.utils.formatEther(fundraiser.goal)} ETH</p>
      <p><strong>Raised:</strong> {ethers.utils.formatEther(fundraiser.totalDonations)} ETH</p>
      <p><strong>Deadline:</strong> {new Date(fundraiser.deadline * 1000).toLocaleString()}</p>

      <div className="donation-section">
        <input
          type="number"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="Enter ETH amount"
        />
        <button onClick={handleDonate}>Donate</button>
        {donationSuccess && <p>Thank you for your donation!</p>}
      </div>
    </div>
  );
};

export default FundraiserCard;
