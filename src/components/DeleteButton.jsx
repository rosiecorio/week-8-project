'use client'

import { handleDelete } from "./actions"

export default function DeleteButton({id}) {

    return (
        <button onClick={() => {
            handleDelete(id)
        }}>X</button>
    )
}