import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal";
import React, { useEffect, useState, useRef } from 'react';
import {providers, BigNumber, ethers, utils } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants.js" 

export  default function Home() {

  const [walletConnected, setWalletConnected] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(0);
  const web3ModalRef = useRef();
  console.log(tokenAmount);


  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      
    } catch (error) {
      console.error(error);
    }
  }

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change the network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, [walletConnected]);


  

  const contractInstance = async (providerOrSigner) => {
    try {

      const instance = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        providerOrSigner,
      )
      return instance;
      
    } catch (error) {
      console.error(error)
      
    }
    
  }; 


  const viewPropertiesOfContract = async () => {
    try {
      let signer = await getProviderOrSigner(true);

      const instance = await contractInstance(signer);

      const tx = await instance.name();
      console.log(tx);

      tx = await instance.symbol();
      console.log(tx);

      tx = await instance.decimals();
      let result = tx.toString();
      console.log(result);

      tx = await instance.totalSupply();
      result = tx.toString();
      console.log(result);
        
      } catch (error) {
        console.error(error);
    }

  };

  


  const transferTokens = async () => {};

  const giveAllowance = async () => {};

  const approve = async () => {};

  const transferFrom = async () => {};

  const increaseAllowance = async () => {};

  const decreaseAllowance = async () => {};





  const mintTokens = async (tokensToMint) => {
    try {

      const signer = await getProviderOrSigner(true);
      const instance = await contractInstance(signer);

      const value = 0.001 * tokensToMint;

      console.log(ethers.utils.parseEther(value.toString()))

      const tx = await instance.mint(
        {
          value: utils.parseEther(value.toString()),
        } 
      );
      await tx.wait();


      const confirmation = await instance.balanceOf(signer.address);
      console.log(confirmation);

      
    } catch (error) {
      console.error(error);
    }
    



  };







  const confirm = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await contractInstance(signer);

      let address = await signer.getAddress();

      
      const total = await contract.totalSupply();
      console.log(total.toString(), "TotalSupply()");

      const tx = await contract.balanceOf(address);
      console.log(tx.toString());






    } catch (error) {
      console.error(error);
    }
  }
  








  const etherTransfer = async () => {};

  // Log the events of approval and transfer.















































  const renderButton = () => {
   
        if(!walletConnected) {
          return (
            <div className={styles.container}>
            <button onClick={connectWallet}>Connect Wallet</button> 
            </div>
          )
        }

        if(walletConnected) {
          return (

          <div>
              <div>
                <div>
                <input 
                  type="number" 
                  placeholder="Amount Of Tokens"
                  onChange={(e) => {setTokenAmount(BigNumber.from(e.target.value))}}
                ></input>
                <button 
                  className={styles.button} 
                  onClick={async () => await mintTokens(tokenAmount)}
                  
                  >Mint Tokens</button>
                </div>
              </div>
            

            
              <div>
                <button className={styles.button} onClick={viewPropertiesOfContract}>See Props</button>
                <button className={styles.button} onClick={confirm}>Confirm</button>
                <button className={styles.button}>Test 4</button>
              </div>
            
          </div>
          )

        }
  }




  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Testing App
        </h1>
        {renderButton()}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
