'use client'
import { useState } from "react"
import CommentForm from "./actions"

export default function FormButton({children}) {
    
    const [showModal, setShowModal] = useState(false)

    function toggleModal() {
        setShowModal(!showModal)
    }
    
    console.log(children)

    return (
        <div>
            <button onClick={toggleModal}>Add</button>
            {showModal && (<div>{children}</div>)}            
        </div>       
        
    )
}