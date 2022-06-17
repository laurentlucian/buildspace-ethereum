const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("FirstGame");
  const gameContract = await gameContractFactory.deploy(
    ["Pink Guy", "Filthy Frank", "Joji"],
    [
      "https://i.scdn.co/image/ae10a882537eab0c76b4dbaeab8fd5233f370fc4",
      "https://static.wikia.nocookie.net/filthy-frank/images/4/42/Screen_Shot_2016-11-26_at_4.04.50_PM.png/revision/latest?cb=20161126210819",
      "https://lastfm.freetls.fastly.net/i/u/770x0/7dd735869a597feb1f28b462ba58b511.jpg",
    ],
    [700, 300, 1000],
    [100, 500, 50],
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runMain();
