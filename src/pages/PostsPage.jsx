import PostItem from '../components/PostItem.jsx'
import axios from '../utils/axios.js'
import React, { useEffect, useState } from 'react'

const PostsPage = () => {
    const [posts, setPosts] = useState([])
    
    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {posts?.map((post, idx) => (
                <PostItem post={post} key={idx} />
            ))}
        </div>
    )
}

export default PostsPage
