'use client'

import { handleCommentDelete } from "./actions"

export default function DeleteCommentButton({id}) {

    return (
        <button onClick={() => {
            handleCommentDelete(id)
        }}>X</button>
    )
}