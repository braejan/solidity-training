const{ expect } = require("chai");
const{ ethers, upgrades } = require("hardhat");

const initialSupply = 10000;
const tokenName = "Smart Tickets Token";
const tokenSymbol = "STT";
const VIPTicketsContractNameV1 = "VIPTicketsV1";


describe("VIP Tickets general tests", function() {
    let tokenV1;
    let tokenV2;
    let deployer;
    let userAccount;
    describe("VIP Tickets tests version 1", function() {
        before(async function () {
            const availableSigners = await ethers.getSigners();
            deployer = availableSigners[0];
            const VIPTicketsTokenV1 = await ethers.getContractFactory(VIPTicketsContractNameV1);

            //this.vipTicketsTokenV1 = await VIPTicketsTokenV1.deploy(tokenName, tokenSymbol, initialSupply);
            tokenV1 = await upgrades.deployProxy(VIPTicketsTokenV1, [initialSupply]);
            await tokenV1.deployed();
        });
    
        it('Should be named VIP Tickets eventName', async function () {
            const fetchedTokenName = await tokenV1.name();
            expect(fetchedTokenName).to.be.equal(tokenName);
        });
        
        it('Should has symbol VIPT', async function () {
            const fetchedTokenName = await tokenV1.symbol();
            expect(fetchedTokenName).to.be.equal(tokenSymbol);
        });
    
        it('Should have total supply with decimals included.', async function () {
            const [fetchedTotalSupply, fetchedDecimals] = await Promise.all(
                [tokenV1.totalSupply(), tokenV1.decimals()]
            );
            expectedTotalSupply = ethers.BigNumber.from(initialSupply)
                .mul(ethers.BigNumber.from(10).pow(fetchedDecimals));
           expect(fetchedTotalSupply.eq(expectedTotalSupply)).to.be.true; 
        }); 
    });
    
    
    describe("VIP Tickets tests version 2", function() {
        before(async function () {
            userAccount = (await ethers.getSigners())[1];
            const VIPTicketsTokenV2 = await ethers.getContractFactory("VIPTicketsV2");
            tokenV2 = await upgrades.upgradeProxy(tokenV1.address, VIPTicketsTokenV2);
            await tokenV2.deployed();
        });
    
        it('Should has the same address, and keep the state as the previous version', async function () {
            const [totalSupplyV1, totalSupplyV2] = await Promise.all([
                tokenV1.totalSupply(),
                tokenV2.totalSupply(),
            ]);
            expect(tokenV1.address).to.be.equal(tokenV2.address);
            expect(totalSupplyV1.eq(totalSupplyV2)).to.be.true;
        }); 
    }); 
});