import instance from './axios'

export const login = (data) => instance.post('/auth/login', data)

export const getFeedPosts = () => instance.get('/post/get-following-users-posts')

export const getMyUserPosts = () => instance.get('/post/get-users-all-posts')

export const createPost = (postDto) => instance.post('/post/create-post', postDto)

export const likePost = (postId) => instance.put(`/post/like-post/${postId}`)

export const unlikePost = (postId) => instance.put(`/post/unlike-post/${postId}`)
