import useRouter from 'next/router'
import { useViewerRecord } from "@self.id/react"

export default function Profile () { 

  const router = useRouter
  const { record } = router.query

    return (
      <div className="absolute w-6/12 h-1/2 rounded-md top-1/4 left-1/4 shadow-2xl p-5 flex flex-col justify-center items-center">
        <div className="p-4 text-center text-2xl">
          Hello, {record.content.name}
        </div>
        <div className="text-center text-xl p-4">
          {record.content.description}
        </div>
        <div className="p-4 text-center">
          <Link href="/edit">
            <button className="rounded-md bg-orange-300 hover:bg-orange-500 px-5 py-2">
              Edit
            </button>
          </Link>
        </div>
      </div>
    )
  }