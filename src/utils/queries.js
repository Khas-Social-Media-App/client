import instance from './axios'

export const login = (data) => instance.post('/auth/login', data)

export const getFeedPosts = () => instance.get('/post/get-following-users-posts')

export const getMyUserPosts = () => instance.get('/post/get-users-all-posts')

export const createPost = (postDto) => instance.post('/post/create-post', postDto)

export const likePost = (postId) => instance.put(`/post/like-post/${postId}`)

export const unlikePost = (postId) => instance.put(`/post/unlike-post/${postId}`)

export const getSingleUser = (userId) => instance.get(`/user/single-user/${userId}`)

export const getUserPostsCount = () => instance.get(`/post/get-user-posts-count`)

export const searchUser = ({ page, text }) => instance.get(`/user/search-user?text=${text}&page=${page}`)

export const followUser = ({ followedPersonId }) => instance.put(`/user/follow-user/${followedPersonId}`)

export const unfollowUser = ({ followedPersonId }) => instance.put(`/user/unfollow-user/${followedPersonId}`)

export const updateUser = (userDto) => instance.put('/user/update-user', userDto)
