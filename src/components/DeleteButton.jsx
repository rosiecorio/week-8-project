'use client'

import { handleCommentDelete } from "./actions"

export default function DeleteCommentButton({id}) {

    return (
        <button className="absolute right-5" onClick={() => {
            handleCommentDelete(id)
        }}>X</button>
    )
}