import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
declare let require: any;
const Web3 = require('web3');
const {staking_escrow_abi,staking_escrow_address,token_address,token_abi,Dispatcher_abi,dispatcher_address}=require('./abis.js');
  const infura_url = 'https://goerli.infura.io/';

const msgParams = [
  {
      type: 'string',
      name: 'Authorization Request',
      value: 'Hi there from stakeit.space! Sign this message to prove you have access to this wallet and we\'ll log you in. This won\'t cost you any Ether.'
  }
];
declare let window: any;
@Injectable()
export class Web3Service {
  private web3: any;
  private accounts: string[];
  public ready = false;

  public accountsObservable = new Subject<string[]>();

  constructor() {
    console.log(staking_escrow_abi,'staking_escrow_abi');
    // console.log(staking_escrow_abi,staking_escrow_address,token_address,token_abi,);
    // console.log(staking_escrow_abi,staking_escrow_address,token_address,token_abi,);

    // window.addEventListener('load', (event) => {
    //  // this.web3 =  this.bootstrapWeb3();//==null?alert("you a"):null;

    // });
  }
  staking_escrow;
  dispatcherContract;
  token;

  init_contracts() {
    console.log( dispatcher_address,'dispatcher_address');
    console.log( new Web3(),'new Web3.eth');
         const provider = new Web3.providers.HttpProvider(infura_url);
          const web3 = new Web3(this.web3.currentProvider);
    this.staking_escrow = new web3.eth.Contract(staking_escrow_abi, dispatcher_address);
    this.dispatcherContract = new web3.eth.Contract(Dispatcher_abi, dispatcher_address);
    this.token = new web3.eth.Contract(token_abi, token_address);
    console.log( this.dispatcherContract,'dispatcherContract');
    console.log( this.staking_escrow,'staking_escrow');


}
public async  connect(){
   this.web3=      await  this.bootstrapWeb3();
   console.log(this.web3,'this.web3');

if(!this.web3){
  // alert that metamsk no installed
  return null;
}else{
this.init_contracts()

 await this.init_ui()
 return true;
}
}
  private async  bootstrapWeb3() {
    // console.log(window.ethereum,'window.ethereum');
    // console.log(window.Web3.currentProvider,'window.ethereum');

      if ( typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            return web3;
          } catch (error) {
            console.error(error);
            return null;
          }
        }

        // Legacy dapp browsers...
        else if (typeof window.Web3 !== 'undefined') {
          // Use Mist/MetaMask's provider.

          window.isMetaMask = true;
          console.log(window.Web3.currentProvider,'window.web3.currentProvider');

          const web3 = new Web3(window.Web3.currentProvider);
          console.log('Injected web3 detected.');
          return web3;
        }
        // Fallback to localhost; use dev console port by default...
        else {
          // const provider = new Web3.providers.HttpProvider(infura_url);
          // const web3 = new Web3(provider);
          // console.log('No web3 instance injected, using Local web3.');

          return null;
        }

  }
  async  init_ui() {
    const accounts = (await this. web3.eth.getAccounts());
    console.log(accounts,'accounts');
    if (!accounts[0]) {
        this.watchAccountUnlock();
    } else {
        this. web3.eth.defaultAccount = accounts[0];
     //  this. requestSignature();
    }

}

 requestSignature():any {
  return new Promise(resolve => {
    this.web3.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [msgParams, this. web3.eth.defaultAccount],
      from: this. web3.eth.defaultAccount,
    }, (err, result) => {
      if (err) return console.error(err)
      if (result.error) {
        // User denied signature
        resolve( false);
      }

      resolve( result.result);

    });

});
   }
private watchAccountUnlock() {
    const toClear = setInterval(() => {
       this. web3.eth.getAccounts((err, accounts) => {
            if (accounts[0] !== this. web3.eth.defaultAccount) {
                this. web3.eth.defaultAccount = accounts[0];
               // this.requestSignature();
                clearInterval(toClear);
            }
        });
    },500);
}
  public async refreshAccounts() {
    const accs = await this. web3.eth.getAccounts();
    console.log('Refreshing accounts');

    // Get the initial account balance so it can be displayed.
    if (accs.length === 0) {
      console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return null;
    }

    if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
      console.log('Observed new accounts');

      this.accountsObservable.next(accs);
      this.accounts = accs;
    }

    this.ready = true;
    return accs[0];
  }


  async  approveAndCall(amount,from,duration) {
    console.log('approve');

      return new Promise(resolve => {
        //this address is for dispatcher to fix the issue
         this. token.methods.approveAndCall("0xdC098916291e1ef683A4f469fa32025c872194df", amount,duration)
          .send({'from': from})
          .once('transactionHash',(hash)=> {resolve(true);});
      });
  }
  async  getLockedTokens(address,duration) {
      return new Promise(async(resolve) => {
     const data= await   this.staking_escrow.methods.getLockedTokens(address, duration)
          .call();
          console.log(data,'getLockedTokens');

          resolve(data);
      });
  }
  async  minWorkerPeriods() {
      return new Promise(async(resolve) => {
     const data= await   this.staking_escrow.methods.minWorkerPeriods()
          .call();
          console.log(data,'minWorkerPeriods');

          resolve(data);
      });
  }
  async  getSubStakeInfo(address,index) {
      return new Promise(async(resolve) => {
     const data= await   this.staking_escrow.methods.getSubStakeInfo(address, index)
          .call();
          console.log(data,'datadatadata');

          resolve(data);
      });
  }
  async  getSubStakesLength(address) {
      return new Promise(async(resolve) => {
     const data= await   this.staking_escrow.methods.getSubStakesLength(address)
          .call();
          console.log(data,'datadatadata');

          resolve(data);
      });
  }
  async  getStakerInfo(address) {
      return new Promise(async(resolve) => {
     const data= await    this.staking_escrow.methods.stakerInfo(address)
          .call();
          console.log(data,'datadatadata');

          resolve(data);
      });
  }

  async  isReStakeLocked(address) {
      return new Promise(async(resolve) => {
     const data= await    this.staking_escrow.methods.isReStakeLocked(address)
          .call();
          console.log(data,'datadatadata');

          resolve(data);
      });
  }

  //endTimestampPeriod - currentPeriod + 1
  async  getBlance(address) {
    return new Promise(async(resolve) => {
   const data= await   this.token.methods.balanceOf(address)
        .call();
        console.log(data,'balanceOf');
        const fromWei = this.web3.utils.fromWei(data,'ether')
        resolve(fromWei);
    });
}
//Withdraw reward,  retake, winddown, set worker,  detach worker, prolong "which I will start work on them

// change state functions
  async  handleStake(balance,duration) {
    console.warn('BYTES', this.hexToBytesFixed(this.web3.utils.numberToHex(duration)))
      const default_account = (await this.web3.eth.getAccounts())[0];
      // const balance = $('#stake-value').val();

      // console.log(staking_escrow_address,'staking_escrow_address');
      // balance = (BigInt(parseFloat(balance) * 1000) *
      //            BigInt('1000000000000000000') / BigInt('1000')).toString();  // how to do this shit better??
  // const allowance=await token.methods.allowance(default_account, staking_escrow_address).call();
  console.log(this.web3.utils.toWei(this.web3.utils.toBN(balance).toString(), 'ether'),'toBN(1234)');
  console.log(this.web3.utils.toBN(balance).toString(),'toBN');

  return  await this.approveAndCall(this.web3.utils.toWei(this.web3.utils.toBN(balance).toString()),default_account,this.hexToBytesFixed(this.web3.utils.numberToHex(duration)));

  //  await approve(balance);
  //  await staking_escrow.methods.deposit(balance, duration).send({'from': default_account});
   //await staking_escrow.methods.lock(balance, duration).send({'from': default_account});
  }

  hexToBytesFixed(hex) {
    hex = hex.toString(16);

    if (!this.web3.utils.isHexStrict(hex)) {
        throw new Error(`Given value "${hex}" is not a valid hex string.`);
    }

    hex = hex.replace(/^0x/i, '');
    hex = hex.length % 2 ? '0' + hex : hex;

    let bytes = [];
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }

    return bytes;
  }

  async  setWindDown(status) {
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.staking_escrow.methods.setWindDown(status).send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
  async  approve(amount) {
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.token.methods.approve(staking_escrow_address, amount)
        .send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
  //stakerInfo.value - max(getLockedTokens(staker, 0),  getLockedTokens(staker, 1))
  async  withdraw(amount) {
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
      amount = this.web3.utils.toWei(amount.toString(), 'ether')
        this.staking_escrow.methods.withdraw(amount).send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
  // call getSubStakesLength to get the index first
  async  prolongStake(index,period) {
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.staking_escrow.methods.prolongStake(index,period).send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
  async  divideStake( _index,  _newValue,  _periods) {
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.staking_escrow.methods. divideStake( _index, this.web3.utils.toWei(this.web3.utils.toBN(_newValue).toString()) ,  _periods).send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
  // _reStake bool
  async  setReStake(_reStake) {
    console.warn(_reStake)
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.staking_escrow.methods.setReStake(_reStake) .send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
  async lockReStake(_lockReStakeUntilPeriod) {
    console.warn('lockRestake', _lockReStakeUntilPeriod)
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.staking_escrow.methods.lockReStake(_lockReStakeUntilPeriod) .send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
  //  worker call it
  async  confirmActivity() {
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.staking_escrow.methods.confirmActivity() .send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }

  // for detatch , pass 0X value
  async  setWorker(address) {
    const default_account = (await this.web3.eth.getAccounts())[0];
    return new Promise(resolve => {
        this.staking_escrow.methods.setWorker(address).send({'from': default_account})
        .once('transactionHash', function(hash) {resolve(true);});
    });
  }
}
