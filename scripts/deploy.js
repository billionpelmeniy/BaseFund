async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const Fundraiser = await ethers.getContractFactory('Fundraiser');
  const fundraiser = await Fundraiser.deploy("Sample Fundraiser", "This is a test fundraiser", ethers.utils.parseEther("5"), 3600);

  console.log('Fundraiser deployed to:', fundraiser.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
