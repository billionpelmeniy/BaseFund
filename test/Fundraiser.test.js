const { expect } = require("chai");

describe("Fundraiser", function () {
  it("Should deploy and accept donations", async function () {
    const [owner, donor] = await ethers.getSigners();
    const Fundraiser = await ethers.getContractFactory("Fundraiser");
    const fundraiser = await Fundraiser.deploy("Test Fundraiser", "Testing", ethers.utils.parseEther("5"), 3600);
    
    await fundraiser.deployed();

    // Check initial values
    expect(await fundraiser.totalDonations()).to.equal(0);

    // Donate
    await fundraiser.connect(donor).donate({ value: ethers.utils.parseEther("1") });

    // Check updated values
    expect(await fundraiser.totalDonations()).to.equal(ethers.utils.parseEther("1"));
  });
});
