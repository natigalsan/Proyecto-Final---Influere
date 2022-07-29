import React, { Component, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Axios from "axios";

export const CloudinaryTest = () => {
    const uploadPicture = (user, file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "influere_uns")
        formData.append("public_id", user)
        //Axios.post("https://api.cloudinary.com/v1_1/influere/image/upload", formData).then((response)=> {console.log(response.data.url)})
    }
    const [instaUser, setInstaUser] = useState("")
    const [instaPic, setInstaPic] = useState("")
    return (
        <div className="App">
            <input type="text" onChange={(event) => { setInstaUser(event.target.value) }} />
            <input type="file" onChange={(event) => { setInstaPic(event.target.files[0]) }} />
            <button onClick={(event) => { uploadPicture(instaUser, instaPic) }}>Send</button>
        </div>
    );

}