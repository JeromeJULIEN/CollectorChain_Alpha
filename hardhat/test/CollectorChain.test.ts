import { expect, assert } from "chai";
import { ethers } from "hardhat";
import { MinEthersFactory } from "../typechain-types/common";
import { CollectorChain } from "../typechain-types/contracts/CollectorChain"

describe("CollectorChain Beta", function () {
    let collectorChain: CollectorChain;

    beforeEach(async function () {
        [this.owner, this.addr1, this.addr2, ...this.addrs] = await ethers.getSigners(); // on recupère les addresses de la blockchain local hardhat (à lancer d'abord)
        const CollectorChain = await ethers.getContractFactory("CollectorChain");
        collectorChain = await CollectorChain.deploy();
    })

    describe("constructor testing", function () {
        it("should set the URI of the collection", async function () {
            let URI: string = await collectorChain.contractMetaDataURI()
            assert.equal(URI, "")
        })
    })

    describe("createMintProposal() testing", function () {
        it("should create a mint proposal", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100);
            const mintProposal = await collectorChain.nftList(0)
            assert.equal(mintProposal.nftId.toString(), "0")
            assert.equal(mintProposal.minter, this.owner.address)
            assert.equal(mintProposal.nftName, "name")
            assert.equal(mintProposal.stockerId.toString(), "1")
            assert.equal(mintProposal.status.toString(), "0")// status proposed
            assert.equal(mintProposal.imageURL, "url")
            assert.equal(mintProposal.sharesQty.toString(), "100")
            await collectorChain.connect(this.addr1).createMintProposal("name", 1, "url", 100);
            // additionnal test
            const mintProposalId1 = await collectorChain.nftList(1)
            assert.equal(mintProposalId1.minter, this.addr1.address)
        })
        it("should increment nftId counter", async function () {
            const counterBefore = await collectorChain._nftIdCounter()
            assert.equal(counterBefore.toString(), "0")
            await collectorChain.createMintProposal("name", 1, "url", 100);
            const counterAfter = await collectorChain._nftIdCounter()
            assert.equal(counterAfter.toString(), "1")
        })
        it("should set isNftExist boolean to true for the used id", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100);
            await collectorChain.createMintProposal("name", 1, "url", 100);
            const boolId0: boolean = await collectorChain.isNftExist(0)
            const boolId1: boolean = await collectorChain.isNftExist(1)
            const boolId2: boolean = await collectorChain.isNftExist(2)
            assert.equal(boolId0, true)
            assert.equal(boolId1, true)
            assert.equal(boolId2, false)
        })
    })

    describe("setMintProposalStatus() testing", function () {
        it("should revert if not the owner", async function () {
            await expect(collectorChain.connect(this.addr1).setMintProposalStatus(true, 0)).to.be.revertedWith("Ownable: caller is not the owner")
        })
        it("should revert if the nft doesn't exist", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100);
            await collectorChain.setMintProposalStatus(true, 0)
            await expect(collectorChain.setMintProposalStatus(true, 1)).to.be.revertedWith("nft doesn't exist")
        })
        it("should revert if the nft status is different of 'proposed'", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 1
            await collectorChain.setMintProposalStatus(true, 0)
            await expect(collectorChain.setMintProposalStatus(true, 0)).to.be.revertedWith("NFT status is not proposed")
            await collectorChain.setMintProposalStatus(true, 1) // additionnal test to insure the result
        })
        it("should set the mint status to 'accepted' if _vote param is 'true'", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 1
            await collectorChain.setMintProposalStatus(true, 0)
            const mintProposalId0 = await collectorChain.nftList(0)
            const mintProposalId1 = await collectorChain.nftList(1)
            assert.equal(mintProposalId0.status.toString(), "1")
            assert.equal(mintProposalId1.status.toString(), "0")
        })
        it("should set the mint status to 'rejected' if _vote param is 'false'", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 1
            await collectorChain.setMintProposalStatus(false, 0)
            const mintProposalId0 = await collectorChain.nftList(0)
            const mintProposalId1 = await collectorChain.nftList(1)
            assert.equal(mintProposalId0.status.toString(), "2")
            assert.equal(mintProposalId1.status.toString(), "0")
        })
    })
    describe("mintNft() testing", function () {
        it("should revert if the mint status is different of 'accepted'", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 1
            await collectorChain.setMintProposalStatus(false, 0)
            await collectorChain.setMintProposalStatus(true, 1)
            await collectorChain.mintNft(1, "nftURI") // should work
            await expect(collectorChain.mintNft(0, "nftURI")).to.be.revertedWith("nft status isn't accepted")
        })
        it("should revert if the caller isn't the mint proposer", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.connect(this.addr1).createMintProposal("name", 1, "url", 100); // id 1
            await collectorChain.setMintProposalStatus(true, 0)
            await collectorChain.setMintProposalStatus(true, 1)
            await collectorChain.mintNft(0, "nftURI") // should work
            await expect(collectorChain.mintNft(1, "nftURI")).to.be.revertedWith("not the nft proposer")
        })
        it("should set the mint status to 'minted'", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.connect(this.addr1).createMintProposal("name", 1, "url", 100); // id 1
            await collectorChain.setMintProposalStatus(true, 0)
            await collectorChain.setMintProposalStatus(true, 1)
            await collectorChain.mintNft(0, "nftURI")
            const mintProposalId0 = await collectorChain.nftList(0)
            const mintProposalId1 = await collectorChain.nftList(1)
            assert.equal(mintProposalId0.status.toString(), "3")
            assert.equal(mintProposalId1.status.toString(), "1")
        })
        it("should set the token URI", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.setMintProposalStatus(true, 0)
            await collectorChain.mintNft(0, "nftURI")
            const tokenURI: string = await collectorChain.uri(0)
            assert.equal(tokenURI, "nftURI")
        })
        it("should mint x nft to the minter's wallet", async function () {
            await collectorChain.createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.setMintProposalStatus(true, 0)
            await collectorChain.mintNft(0, "nftURI")
            const balance = await collectorChain.balanceOf(this.owner.address, 0)
            assert.equal(balance.toString(), "100")
        })
        it("should set the minter as the royalty receiver", async function () {
            await collectorChain.connect(this.addr1).createMintProposal("name", 1, "url", 100); // id 0
            await collectorChain.setMintProposalStatus(true, 0)
            await collectorChain.connect(this.addr1).mintNft(0, "nftURI")
            const receiver = await collectorChain.royaltyInfo(0, 10 ** 10)
            const royaltyAmount = (10 ** 10) * 0.05
            assert.equal(receiver[0], this.addr1.address.toString())
            assert.equal(receiver[1].toString(), royaltyAmount.toString())

        })
    })
    describe("stockerCreation() test", function () {
        it("should revert if not the owner", async function () {
            await expect(collectorChain.connect(this.addr1).stockerCreation(this.addr2.address, "name")).to.be.revertedWith("Ownable: caller is not the owner")
        })
        it("should create a new stocker", async function () {
            await collectorChain.stockerCreation(this.addr2.address, "name")
            const stocker = await collectorChain.stockerList(0)
            assert.equal(stocker.stockerAddr, this.addr2.address)
            assert.equal(stocker.stockerName, "name")
        })
        it("should increment stocker id counter", async function () {
            const counterBefore = await collectorChain._stockerIdCounter()
            assert.equal(counterBefore.toString(), "0")
            await collectorChain.stockerCreation(this.addr2.address, "name")
            const counterAfter = await collectorChain._stockerIdCounter()
            assert.equal(counterAfter.toString(), "1")
        })
    })
    describe("setBaseFee() testing", function () {
        it("should revert if not the owner", async function () {
            await expect(collectorChain.connect(this.addr1).setBaseFee(1000)).to.be.revertedWith("Ownable: caller is not the owner")
        })
        it("should revert if fee param > 10000", async function () {
            await collectorChain.setBaseFee(9999) // should work
            await collectorChain.setBaseFee(10000) // should work
            await expect(collectorChain.setBaseFee(10001)).to.be.revertedWith("fee too high")
        })
        it("should change base fee to the selected value", async function () {
            const baseFeeBefore = await collectorChain._baseFeeNumerator()
            assert.equal(baseFeeBefore.toString(), "500")
            await collectorChain.setBaseFee(1000)
            const baseFeeAfter = await collectorChain._baseFeeNumerator()
            assert.equal(baseFeeAfter.toString(), "1000")

        })
    })
    describe("setContractURI() testing", function () {
        it("should revert if not the owner", async function () {
            await expect(collectorChain.connect(this.addr1).setContractURI("URI")).to.be.revertedWith("Ownable: caller is not the owner")
        })
        it("should change the contractURI", async function () {
            const URIBefore = await collectorChain.contractURI()
            assert.equal(URIBefore, "")
            await collectorChain.setContractURI("newContractURI")
            const URIAfter = await collectorChain.contractURI()
            assert.equal(URIAfter, "newContractURI")
        })
    })
    describe("contractURI() testing", function () {
        it("should return the contract URI", async function () {
            await collectorChain.setContractURI("newContractURI")
            const URI = await collectorChain.contractURI()
            assert.equal(URI, "newContractURI")
        })
    })
})