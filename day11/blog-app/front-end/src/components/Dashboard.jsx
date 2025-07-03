import { useState, useEffect } from "react";
import axios from "axios";

function DashboardHeader() {
    return (
        <>
            <h1>Dashboard</h1>
            <i>Welcome, {localStorage.getItem("username")}</i><br></br><br></br>
        </>
    )
}

function DashboardInput({ handleCreateBlog }) {
    return (
        <>
            <input type="text" placeholder="Title" id="title" />
            <input type="text" placeholder="Content" id="content" />
            <button type="submit" onClick={handleCreateBlog}>Create Blog</button>
        </>
    )
}
function DashboardBlogs({ blogs, handleDeleteBlog }) {
    return (
        <>
            <h2>My Blogs</h2>
            <div className="blog-container">
                {blogs.map((blog, index) => (
                    <div key={index} className="blog-item">
                    <h3><a href={`/blog?id=${blog.id}`}>{blog.title}</a>
                        <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button></h3>
                    </div>
                ))}
        </div >
        </>
    )
}


function Dashboard() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getallblogs();
    }, []);

    function getallblogs() {
        axios.get("http://localhost:3000/blogs", { headers: { token: localStorage.getItem("token") } })
            .then((res) => {
                console.log(res.data.blogs);
                setBlogs(res.data.blogs);
            })
    }

    function handleCreateBlog() {
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        axios.post("http://localhost:3000/blog", { title, content }, { headers: { token: localStorage.getItem("token") } })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.message);
                    setBlogs([...blogs, { id: Date.now(), title, content }]);
                }
                else {
                    alert("Error creating blog");
                }
            })
            .catch((err) => {
                console.log("Error creating blog", err);
            })
    }

    function handleDeleteBlog(id) {
        axios.delete(`http://localhost:3000/blog/${id}`, { headers: { token: localStorage.getItem("token") } })
            .then((res) => {
                console.log(res.data.message);
                setBlogs(blogs.filter((blog) => blog.id !== id));
            })
    }


    return (
        <>
            <DashboardHeader />
            <DashboardInput handleCreateBlog={handleCreateBlog} />
            <DashboardBlogs blogs={blogs} handleDeleteBlog={handleDeleteBlog} />
        </>
    )
}

export default Dashboard;
