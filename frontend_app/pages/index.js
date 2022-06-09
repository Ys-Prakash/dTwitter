import Head from 'next/head'
import Image from 'next/image'
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
    <div className="w-full h-screen relative">
        {connection.status === "connected" ? (
          <CheckSignup />
        ) : (
          <div className="absolute w-6/12 h-1/2 rounded-md top-1/4 left-1/4 shadow-2xl p-5 flex flex-col justify-center items-center">
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
  )
}

function CheckSignup() {

  const record = useViewerRecord("basicProfile")

  return (
    <>
      {record.content ? (
        <Profile record={record} />
      ) : (
        <Signup record={record} />
      )}
    </>
  )
}

function Profile (props) { 

  return (
    <div className="absolute w-6/12 h-1/2 rounded-md top-1/4 left-1/4 shadow-2xl p-5 flex flex-col justify-center items-center">
      <div className="p-4 text-center text-2xl">
        Hello, {props.record.content.name}
      </div>
      <div className="text-center text-xl p-4">
        {props.record.content.description}
      </div>
    </div>
  )
}


function Signup(props) {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const updateRecordContent = async (name, description) => {
    await record.merge({
      name: name,
      description: description
    });
  };

  return (
        <div className="absolute w-6/12 h-1/2 rounded-md top-1/4 left-1/4 shadow-2xl p-5 flex flex-col items-center justify-center">
          <div className="p-4 text-center text-xl">
            <p>Please signup.</p>
          </div>
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
  )
}
