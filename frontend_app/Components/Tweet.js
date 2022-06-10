import React from 'react'
import Link from 'next/link'

export default function Tweet(props) {
  return (
    <>
      <div>NFT mint component</div>
      <Link href="/">
        <button className="rounded-md bg-red-300">Profile</button>
      </Link>
    </>
  )
}

//TODO: Change this component to a NFT mint component. This will have:
// 1. A button, at the bottom left, to see own's profile.  
// 2. A button to mint a NFT.
// 3. No. of NFTs available to mint (each gets 2).
// 4. Design the page well.  
