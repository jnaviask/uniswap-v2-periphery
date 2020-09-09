const UniswapV2Router02 = artifacts.require('UniswapV2Router02');
const ERC20 = artifacts.require('ERC20');

const TOKEN_A_ADDRESS = '0x92496871560a01551E1B4fD04540D7A519D5C19e';
const TOKEN_B_ADDRESS = '0x63A1519eE99d1121780FFfa1726Ed2eCc6d1611B';

const toBn = (value) => new web3.utils.toBN(value)
const toBnWithDecimals = (x, y = 18) => toBn((toBn(x).mul(toBn(10).pow(toBn(y)))).toString())

contract('UniswapV2Router02 Test', (accounts) => {
   it('should add liquidity', async () => {
      console.log('Fetching router...');
      let router = await UniswapV2Router02.deployed();
      console.log('Fetching tokens...');
      let tokenA = await ERC20.at(TOKEN_A_ADDRESS);
      let tokenB = await ERC20.at(TOKEN_B_ADDRESS);

      const amount = toBnWithDecimals(100);
      console.log('Approving token A...');
      await tokenA.approve(router.address, amount, { from: accounts[0] });
      console.log('Approving token B...');
      await tokenB.approve(router.address, amount, { from: accounts[0] });
      
      // perform router call
      console.log('Adding liquidity...');
      const result = await router.addLiquidity(
         tokenA.address, tokenB.address,
         amount, amount,
         "0", "0",
         accounts[0],
         Math.ceil(Date.now() / 1000) + (60 * 20), // 1 day)
         { from: accounts[0] },
      );
      console.log(result);
   });
});
