import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal"
import { useEffect, useRef, useState } from "react"
import { EthereumAuthProvider } from "@self.id/web"
import { useViewerConnection } from "@self.id/react"
import { Web3Provider } from "@ethersproject/providers"



export default function Home() {

  const [connection, connect, disconnect] = useViewerConnection();

  const web3ModalRef = useRef();

  const getProvider = async () => {
      const provider = await web3ModalRef.current.connect();
      const wrappedProvider = new Web3Provider(provider);
      return wrappedProvider;
  }

  const connectToSelfID = async () => {
      const ethereumAuthProvider = await getEthereumAuthProvider();
      connect(ethereumAuthProvider);
  }

  const getEthereumAuthProvider = async () => {
      const wrappedProvider = await getProvider();
      const signer = wrappedProvider.getSigner();
      const address = await signer.getAddress();
      return new EthereumAuthProvider(wrappedProvider.provider, address);
  }

  useEffect(() => {
      if (connection.status !== "connected" || connection.status !== "connecting") {
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {},
          disableInjectedProvider: false,
        });
      }
  }, [connection.status]);

  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div className="flex flex-row min-h-screen justify-center items-center place-content-center grid grid-flow-col auto-cols-max">
        <div className="w-full h-40 pb-12">
          <div className="text-2xl font-semibold place-content-center">Connect your wallet</div> 
        </div> 
        <div className="w-full place-content-center h-50 pt-12 place-content-center pr-8">
          {connection.status === "connected" ? (
            <div className = "text-2xl">Connected</div>
          ) : (
            <div className="pr-10">
              <button
                onClick={connectToSelfID}
                className="rounded-full transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                disabled={connection.status === "connecting"}
              >
                Connect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    )
}
