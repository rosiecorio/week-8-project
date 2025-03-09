'use client'
import { useState } from "react"
import CommentForm from "./actions"

export default function FormButton({children, text}) {
    
    const [showModal, setShowModal] = useState(false)

    function toggleModal() {
        setShowModal(!showModal)
    }
    
    // console.log(children)

    return (
        <div className="hover:bg-sky-600">
            <button onClick={toggleModal}>{text}</button>
            {showModal && (<div>{children}</div>)}            
        </div>       
        
    )
}