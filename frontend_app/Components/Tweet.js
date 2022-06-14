import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Tweet(props) {

  return (
    <div className="relative w-full h-full bg-tweetpage-pattern bg-no-repeat bg-cover">
      <div className="absolute w-full p-5 top-0 left-0 flex justify-end">
        <Link
        href={{
          pathname: "/profile",
          query: props.record
        }}>
          <button className="rounded-md bg-fuchsia-900 px-4 py-2 text-neutral-50">
            Profile
          </button>
        </Link>
      </div>
      <div className="mt-48 absolute w-6/12 ml-5 text-neutral-50 text-5xl">
        Mint special DSM black hole NFTs! 
      </div>
      <div className="absolute mt-72 ml-5 w-3/12">
        <button className="rounded-md bg-fuchsia-900 px-6 py-4 text-neutral-50 text-2xl">
          Mint a DSM NFT
        </button> 
      </div>
    </div>
  )
}

//TODO: Change this component to a NFT mint component. This will have:
// 1. A button, at the bottom left, to see own's profile.  
// 2. A button to mint a NFT.
// 3. No. of NFTs available to mint (each gets 2).
// 4. Design the page well.  
