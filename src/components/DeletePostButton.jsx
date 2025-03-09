'use client'

import { handlePostDelete } from "./actions"

export default function DeletePostButton({id}) {
    return (
        <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs absolute right-7" onClick={() => {
            handlePostDelete(id)
        }}>X</button>
    )
}