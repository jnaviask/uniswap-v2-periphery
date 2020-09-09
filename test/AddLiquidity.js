const UniswapV2Router02 = artifacts.require('UniswapV2Router02');
const ERC20 = artifacts.require('ERC20');

const toBn = (value) => new web3.utils.toBN(value)
const toBnWithDecimals = (x, y = 18) => toBn((toBn(x).mul(toBn(10).pow(toBn(y)))).toString())

contract('UniswapV2Router02 Test', (accounts) => {
   it('should add liquidity', async () => {
      console.log('Fetching router...');
      let router = await UniswapV2Router02.deployed();

      console.log('Deploying tokens...');
      let tokenA = await ERC20.new(toBnWithDecimals(1000), { from: accounts[0] });
      let tokenB = await ERC20.new(toBnWithDecimals(1000), { from: accounts[0] });

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
