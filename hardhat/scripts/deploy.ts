import { artifacts, ethers } from "hardhat";
import hre from "hardhat";


async function main() {

  const CollectorChain = await ethers.getContractFactory("CollectorChain");
  const collectorChain = await CollectorChain.deploy();
  await collectorChain.deployed();
  saveFrontendFiles(collectorChain, "CollectorChain");
  console.log(`deployed at address ${collectorChain.address}`);
}

// fonction gérant l'écriture des fichiers artifact et address
function saveFrontendFiles(contract: any, contractName: string) {
  // get the information on the network used for deployment
  const networkName = hre.network.name
  const chainId: number | undefined = hre.network.config.chainId

  const fs = require("fs");
  const path = require("path")
  // on génère un dossier au nom du contrat
  //! le dossier 'contracts' dans 'client/src' doit déjà exister
  const contractsDir: string = path.join(__dirname, "..", "..", "client", "src", "contracts", `${contractName}`)

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  // on écrit le fichier contenant l'adresse de déploiement
  //! remarque dans le cas d'un déploiement sur hardhat, on force le nom à 'hardhat'. 
  //! Sinon c'est 'localhost qui s'écrit => pose pb pour récupérer l'adresse du contract dans app.js
  console.log("network name", networkName);

  if (networkName == "localhost") {
    console.log("entrée dans network == localhost");

    fs.writeFileSync(
      path.join(contractsDir, `${contractName}-address.json`),
      JSON.stringify({ hardhat: contract.address }, undefined, 2)
    );
  } else if (networkName) {
    fs.writeFileSync(
      path.join(contractsDir, `${contractName}-address.json`),
      JSON.stringify({ [networkName]: contract.address }, undefined, 2)
    );
  }

  // idem avec l'artifacts
  const artifact = artifacts.readArtifactSync(contractName)
  fs.writeFileSync(
    path.join(contractsDir, `${contractName}.json`),
    JSON.stringify(artifact, null, 2)
  );

  // retour console
  console.log(`${contractName} contract deployed to address: ${contract.address}`);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
