const{ expect } = require("chai");
const{ ethers, upgrades } = require("hardhat");

const initialSupply = 10000;
const tokenName = "VIP Tickets eventName 1";
const tokenSymbol = "VIPT";
const VIPTicketsContractNameV1 = "VIPTicketsV1";

describe("VIP Tickets tests version 1", function() {
    before(async function () {
        const availableSigners = await ethers.getSigners();
        this.deployer = availableSigners[0];
        const VIPTicketsTokenV1 = await ethers.getContractFactory(VIPTicketsContractNameV1);
        //this.vipTicketsTokenV1 = await VIPTicketsTokenV1.deploy(tokenName, tokenSymbol, initialSupply);
        this.vipTicketsTokenV1 = await upgrades.deployProxy(VIPTicketsTokenV1, [tokenName, tokenSymbol, initialSupply]);
        await this.vipTicketsTokenV1.deployed();
    });

    it('Should be named VIP Tickets eventName', async function () {
        const fetchedTokenName = await this.vipTicketsTokenV1.name();
        expect(fetchedTokenName).to.be.equal(tokenName);
    });
    
    it('Should has symbol VIPT', async function () {
        const fetchedTokenName = await this.vipTicketsTokenV1.symbol();
        expect(fetchedTokenName).to.be.equal(tokenSymbol);
    });

    it('Should have total supply with decimals included.', async function () {
        const [fetchedTotalSupply, fetchedDecimals] = await Promise.all(
            [this.vipTicketsTokenV1.totalSupply(), this.vipTicketsTokenV1.decimals()]
        );
        expectedTotalSupply = ethers.BigNumber.from(initialSupply)
            .mul(ethers.BigNumber.from(10).pow(fetchedDecimals));
       expect(fetchedTotalSupply.eq(expectedTotalSupply)).to.be.true; 
    }); 
});