import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractInteraction from './utils/contractInteraction';
import FundraiserCard from './components/FundraiserCard';

function App() {
  const [fundraisers, setFundraisers] = useState([]);
  
  useEffect(() => {
    const loadFundraisers = async () => {
      const fundraisersFromBlockchain = await contractInteraction.getFundraisers();
      setFundraisers(fundraisersFromBlockchain);
    };
    loadFundraisers();
  }, []);

  return (
    <div className="App">
      <h1>Base Blockchain Fundraisers</h1>
      <div className="fundraiser-list">
        {fundraisers.map((fundraiser, index) => (
          <FundraiserCard key={index} fundraiser={fundraiser} />
        ))}
      </div>
    </div>
  );
}

export default App;
