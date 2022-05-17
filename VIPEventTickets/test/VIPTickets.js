const{ expect } = require("chai");
const{ ethers } = require("hardhat");

const initialSupply = 10000;
const tokenName = "VIP Tickets eventName";
const tokenSymbol = "VIPT";
const VIPTicketsContractName = "VIPTickets";

describe("VIP Tickets tests", function() {
    before(async function () {
        const availableSigners = await ethers.getSigners();
        this.deployer = availableSigners[0];

        const VIPTicketsToken = await ethers.getContractFactory(VIPTicketsContractName);
        this.vipTicketsToken = await VIPTicketsToken.deploy(tokenName, tokenSymbol, initialSupply);
        await this.vipTicketsToken.deployed();
    });

    it('Should be named VIP Tickets eventName', async function () {
        const fetchedTokenName = await this.vipTicketsToken.name();
        expect(fetchedTokenName).to.be.equal(tokenName);
    });
    
    it('Should has symbol VIPT', async function () {
        const fetchedTokenName = await this.vipTicketsToken.symbol();
        expect(fetchedTokenName).to.be.equal(tokenSymbol);
    });

    it('Should have total supply with decimals included.', async function () {
        const [fetchedTotalSupply, fetchedDecimals] = await Promise.all(
            [this.vipTicketsToken.totalSupply(), this.vipTicketsToken.decimals()]
        );
        expectedTotalSupply = ethers.BigNumber.from(initialSupply)
            .mul(ethers.BigNumber.from(10).pow(fetchedDecimals));
       expect(fetchedTotalSupply.eq(expectedTotalSupply)).to.be.true; 
    }); 
});