import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal"
import { useViewerRecord } from "@self.id/react"
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
      if (connection.status !== "connected") {
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {},
          disableInjectedProvider: false,
        });
      }
  }, [connection.status]);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        {connection.status === "connected" ? (
          <div className="m-auto p-4"><RecordSetter /></div>
        ) : (
          <div className="flex-col justify-center items-center">
            <div className="text-center text-2xl p-4">Connect your wallet</div>
            <div className="p-4">
              <button
                onClick={connectToSelfID}
                className="rounded-full bg-orange-300 hover:bg-orange-500 p-2"
                disabled={connection.status === "connecting"}
              >
                Connect
              </button>
            </div>
          </div>
        )}
      </div>  
    </div>    
  )
}

function RecordSetter() {
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const record = useViewerRecord("basicProfile")

  const updateRecordContent = async (name, description) => {
    await record.merge({
      name: name,
      description: description
    });
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        {record.content ? (
          <div className="m-auto text-center text-xl p-4">
            Hello {record.content.name}! <br />
            {record.content.description}
          </div>
        ) : (
          <div className="m-auto text-center text-xl p-4">
            You do not have a profile record attached to your 3ID. Create abasic profile by setting a name below.
          </div>
        )}
        <div className="flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-initial m-auto p-4" />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-initial m-auto p-4" />
          <button className="flex-initial rounded-full bg-orange-300 hover:bg-orange-500 p-2" onClick={() => updateRecordContent(name, description)}>Update</button>
        </div>
      </div>  
    </div>    
  )
}
