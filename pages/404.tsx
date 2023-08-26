// @flow strict

import { Button } from "@mui/material";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-screen flex-col w-screen flex justify-center items-center">
      <h1 className="">
        Page Not Found!
      </h1>
      <div className="flex justify-center items-center">
        <Link href={`/`}>
          <Button
            className="rounded-lg bg-black text-white"
            variant='contained'>Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound;