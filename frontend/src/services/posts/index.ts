import http from '../api'
import type { APIResponse } from '../types'
import type { PostDTO, CreatePostDTO, UpdatePostDTO } from './types'
import { useAuthStore } from '@/stores/auth'

/**
 * Get authorization header with Firebase ID token
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const { auth } = await import('@/config/firebaseConfig')
  const user = auth.currentUser

  if (!user) {
    throw new Error('Not authenticated. Please log in.')
  }

  // Always get a fresh token to ensure it's valid
  const idToken = await user.getIdToken()

  // Update store
  const authStore = useAuthStore()
  authStore.user.token = idToken

  return { Authorization: `Bearer ${idToken}` }
}

async function getAllPosts(count?: number) {
  const query = count ? `?count=${count}` : ''
  return await http.get<PostDTO[]>(`api/v1/posts${query}`)
}

async function getPost(id: string) {
  return await http.get<PostDTO>(`api/v1/posts/${id}`)
}

async function deletePost(id: string) {
  const headers = await getAuthHeaders()
  return await http.delete<APIResponse<boolean>>(`api/v1/posts/${id}`, {
    headers,
  })
}

async function createPost(input: CreatePostDTO) {
  const headers = await getAuthHeaders()
  return await http.post<APIResponse<PostDTO>>('api/v1/posts', input, {
    headers,
  })
}

async function updatePost(id: string, input: Partial<UpdatePostDTO>) {
  const headers = await getAuthHeaders()
  return await http.put<APIResponse<boolean>>(`api/v1/posts/${id}`, input, {
    headers,
  })
}

export default {
  getAllPosts,
  getPost,
  deletePost,
  createPost,
  updatePost,
}
