const CampfireNFT = artifacts.require("CampfireNFT");

module.exports = function (deployer) {
  deployer.deploy(CampfireNFT);
};
