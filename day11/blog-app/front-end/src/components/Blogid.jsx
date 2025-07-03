import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams  } from "react-router";



function Blogid() {
    const [searchParams] = useSearchParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const id = searchParams.get("id");
    console.log(id);


    useEffect(() => {
        getBlog();
    }, []);

    function getBlog() {
        axios.get(`http://localhost:3000/blog?id=${id}`, { headers: { token: localStorage.getItem("token") } })
            .then((res) => {
                setTitle(res.data.blog.title);
                setContent(res.data.blog.content);
            })
    }
    return (
        <>
            <h1>Blog</h1>
                <>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </>
            
            
        </>
    )
}

export default Blogid;  