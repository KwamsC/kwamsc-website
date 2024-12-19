// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import type { CreatePostDTO, Post, UpdatePostDTO } from '@/services/posts/types';
// import { API } from '@/services';
// import type { AxiosError } from 'axios';

// export const usePostStore = defineStore('post', () => {
//   // State
//   const posts = ref<Post[]>([]);

//   // Getters
//   function getPostById(postId: number) {
//     return posts.value.find((p) => p.id === postId);
//   }

//   // Actions
//   function initPosts(data: Post[]) {
//     posts.value = data;
//   }

//   function addPost(post: Post) {
//     posts.value.push(post);
//   }

//   function updatePost(post: Post) {
//     const idx = posts.value.findIndex((p) => p.id === post.id);
//     if (idx !== -1) {
//       posts.value[idx] = post;
//     }
//   }

//   function removePost(id: number) {
//     const idx = posts.value.findIndex((p) => p.id === id);
//     if (idx !== -1) {
//       posts.value.splice(idx, 1);
//     }
//   }

//   // Async actions
//   async function dispatchGetPosts() {
//     try {
//       const { status, data } = await API.posts.getPosts();

//       if (status === 200) {
//         initPosts(data);
//         return { status };
//       }
//     } catch (error) {
//       const _error = error as AxiosError<string>;
//       return { status: _error.response?.status };
//     }
//   }

//   async function dispatchGetPostById(id: number) {
//     try {
//       const { status, data } = await API.posts.getPostById(id);

//       if (status === 200) {
//         addPost(data);
//         return { status };
//       }
//     } catch (error) {
//       const _error = error as AxiosError<string>;
//       return { status: _error.response?.status };
//     }
//   }

//   async function dispatchCreatePost(newPost: CreatePostDTO) {
//     try {
//       const { status, data } = await API.posts.createPost(newPost);

//       if (status === 201) {
//         addPost(data);
//         return { status };
//       }
//     } catch (error) {
//       const _error = error as AxiosError<string>;
//       return { status: _error.response?.status };
//     }
//   }

//   async function dispatchUpdatePost(updatedPost: UpdatePostDTO) {
//     try {
//       const { status, data } = await API.posts.updatePost(updatedPost);

//       if (status === 200) {
//         updatePost(data);
//         return { status };
//       }
//     } catch (error) {
//       const _error = error as AxiosError<string>;
//       return { status: _error.response?.status };
//     }
//   }

//   async function dispatchDeletePost(id: number) {
//     try {
//       const { status } = await API.posts.deletePost(id);

//       if (status === 200) {
//         removePost(id);
//         return { status };
//       }
//     } catch (error) {
//       const _error = error as AxiosError<string>;
//       return { status: _error.response?.status };
//     }
//   }

//   // Return the state, getters, and actions
//   return {
//     posts,
//     getPostById,
//     initPosts,
//     addPost,
//     updatePost,
//     removePost,
//     dispatchGetPosts,
//     dispatchGetPostById,
//     dispatchCreatePost,
//     dispatchUpdatePost,
//     dispatchDeletePost,
//   };
// });
