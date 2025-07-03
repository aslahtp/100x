import { useState, useEffect } from "react";
import axios from "axios";

function Blogid() {
    const [blog, setBlog] = useState(null);
    useEffect(() => {
        GetBlog();
    }, []);
    function GetBlog() {
        const id = new URLSearchParams(window.location.search).get("id");
        console.log(id);
        axios.get(`http://localhost:3000/blog?id=${id}`, { headers: { token: localStorage.getItem("token") } })
            .then((res) => {
                setBlog(res.data.blog);
            })
    }
    return (
        <>
            <h1>Blog</h1>
            <p>Title: {blog.title}</p>
            <p>Content: {blog.content}</p>
        </>
    )
}

export default Blogid;  