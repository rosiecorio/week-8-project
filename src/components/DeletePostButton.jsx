'use client'

import { handlePostDelete } from "./actions"

export default function DeletePostButton({id}) {
    return (
        <button onClick={() => {
            handlePostDelete(id)
        }}>X</button>
    )
}