const { ethers } = require("hardhat");
const { expect } = require("chai");
describe("FirstContract", () => {
	it("should return its name", async () => {
		const FirstContract = await ethers.getContractFactory("FirstContract");
		const firstContract = await FirstContract.deploy("First Contract");
		await firstContract.deployed();
		expect(await firstContract.getName()).to.equal("First Contract");
	});
	it("should set new name", async () => {
		const FirstContract = await ethers.getContractFactory("FirstContract");
		const firstContract = await FirstContract.deploy("First Contract");
		await firstContract.deployed();
		await firstContract.setName("Cool First Contract");
		expect(await firstContract.getName()).to.equal("Cool First Contract");
	});
});
