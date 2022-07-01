import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useViewerRecord } from "@self.id/react"
import { Contract, providers, utils } from "ethers";
import { Web3Provider } from "@ethersproject/providers"
import { abi, NFT_CONTRACT_ADDRESS } from '../constants'

export default function Tweet(props) {

  const [tokenIdsMinted, setTokenIdsMinted] = useState("0")
  const [loading, setloading] = useState(false)

  const record = useViewerRecord("basicProfile")

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await props.web3ModalRef.current.connect();
    const web3Provider = new Web3Provider(provider)

    // For trigerring alert if not onnected to Mumbai network.
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    return web3Provider;
  }

  const publicMint = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      // call the mint from the contract to mint the LW3Punks
      const tx = await nftContract.mint({
        // value signifies the cost of one LW3Punks which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),
      });
      setloading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setloading(false);
      window.alert("You successfully minted a DSM Black hole NFT!");
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(async () => {
    // For getting the no. of tokens minted upon initial render. 
    const signer = await getProviderOrSigner(true);
    const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
    const _tokenIds = await nftContract.tokenIds();
    setTokenIdsMinted(_tokenIds.toString());
  }, [])

  return (
    <div className="relative w-full h-full bg-tweetpage-pattern bg-no-repeat bg-cover">
      {/* <div className="absolute w-full p-5 top-0 left-0 flex justify-end">
        <Link href="/profile">
          <button className="rounded-md bg-fuchsia-900 px-4 py-2 text-neutral-50">
            Profile
          </button>
        </Link>
      </div> */}
      <div className="absolute w-6/12 ml-5 mt-32 text-neutral-50 text-3xl">
        Welcome back {record.content.name}!
      </div>
      <div className="mt-48 absolute w-6/12 ml-5 text-neutral-50 text-5xl">
        Mint special DSM black hole NFTs! 
      </div>
      <div className="absolute mt-72 ml-5 w-3/12">
        <button className="rounded-md bg-fuchsia-900 px-6 py-4 text-neutral-50 text-2xl disabled:opacity-50 disabled:cursor-wait" onClick={publicMint} disabled={loading == true}>
          Mint a DSM NFT
        </button>
      </div>
      <div className="absolute w-6/12 ml-5 mt-96 text-neutral-50 text-2xl">
        {tokenIdsMinted}/10 NFTs minted.
      </div>
    </div>
  )
}