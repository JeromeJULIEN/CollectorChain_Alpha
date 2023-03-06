import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { CollectorChain } from "../typechain-types/contracts/CollectorChain"

describe("CollectorChain Beta", function () {
    let collectorChain: CollectorChain;

    beforeEach(async function () {
        [this.owner, this.addr1, ...this.addrs] = await ethers.getSigners(); // on recupère les addresses de la blockchain local hardhat (à lancer d'abord)
        const CollectorChain = await ethers.getContractFactory("CollectorChain");
        collectorChain = await CollectorChain.deploy();
    })

    describe("constructor testing", function () {
        it("should set the URI of the collection", async function () {
            let URI: string = await collectorChain.contractMetaDataURI()
            assert.equal(URI, "")
        })
    })
})