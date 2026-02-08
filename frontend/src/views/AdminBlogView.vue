<template>
  <div class="container mx-auto max-w-4xl px-4 py-8">
    <div class="mb-6">
      <h1 class="mb-2 text-3xl font-bold">Blog Editor</h1>
      <p class="text-gray-600">Write and manage your blog posts</p>
    </div>

    <!-- Success/Error Messages -->
    <div
      v-if="message"
      :class="[
        'mb-4 rounded p-4',
        messageType === 'success'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800',
      ]"
    >
      {{ message }}
    </div>

    <!-- Post Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Title -->
      <div>
        <label for="title" class="mb-2 block text-sm font-medium text-gray-700">
          Title *
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter post title"
          :style="{ fontSize: '16px' }"
        />
      </div>

      <!-- Author -->
      <div>
        <label
          for="author"
          class="mb-2 block text-sm font-medium text-gray-700"
        >
          Author *
        </label>
        <input
          id="author"
          v-model="formData.author"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
          :style="{ fontSize: '16px' }"
        />
      </div>

      <!-- Tags -->
      <div>
        <label for="tags" class="mb-2 block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          v-model="tagsInput"
          type="text"
          class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="tech, lifestyle, coding"
          :style="{ fontSize: '16px' }"
          @input="updateTags"
        />
        <div v-if="formData.tags.length > 0" class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="tag in formData.tags"
            :key="tag"
            class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Image Upload -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">
          Featured Image (optional)
        </label>
        <div class="space-y-3">
          <!-- Upload Button -->
          <div class="flex items-center gap-3">
            <label
              for="image-upload"
              class="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              :style="{ fontSize: '16px' }"
            >
              {{ uploadingImage ? 'Uploading...' : 'Choose Image' }}
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              class="hidden"
              @change="handleImageUpload"
              :disabled="uploadingImage"
            />
            <span v-if="uploadingImage" class="text-sm text-gray-500">
              Uploading...
            </span>
          </div>

          <!-- Preview or URL Input -->
          <div v-if="formData.imageUrl" class="mt-2">
            <img
              :src="formData.imageUrl"
              alt="Preview"
              class="h-48 max-w-full rounded-lg border border-gray-300 object-cover"
              @error="handleImageError"
            />
            <div class="mt-2 flex items-center gap-2">
              <input
                v-model="formData.imageUrl"
                type="url"
                class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Or paste image URL"
                :style="{ fontSize: '16px' }"
              />
              <button
                type="button"
                @click="formData.imageUrl = ''"
                class="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200"
              >
                Clear
              </button>
            </div>
          </div>
          <div v-else class="text-sm text-gray-500">
            Or paste an image URL below
            <input
              v-model="formData.imageUrl"
              type="url"
              class="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
              :style="{ fontSize: '16px' }"
            />
          </div>
        </div>
      </div>

      <!-- Markdown Editor -->
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700">
          Content (Markdown) *
        </label>
        <MarkdownEditor v-model="formData.content" />
      </div>

      <!-- Published Toggle -->
      <div class="flex items-center gap-3">
        <input
          id="published"
          v-model="formData.published"
          type="checkbox"
          class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label for="published" class="text-sm font-medium text-gray-700">
          Publish immediately
        </label>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          :style="{ fontSize: '16px' }"
        >
          {{
            loading ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'
          }}
        </button>
        <button
          v-if="editingPost"
          type="button"
          @click="resetForm"
          class="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          :style="{ fontSize: '16px' }"
        >
          Cancel
        </button>
      </div>
    </form>

    <!-- Existing Posts List -->
    <div class="mt-12">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-2xl font-bold">Existing Posts</h2>
        <!-- Filter Tabs -->
        <div class="flex gap-2 rounded-lg bg-gray-100 p-1">
          <button
            @click="filterStatus = 'all'"
            :class="[
              'rounded px-4 py-1 text-sm font-medium transition-colors',
              filterStatus === 'all'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            All
          </button>
          <button
            @click="filterStatus = 'published'"
            :class="[
              'rounded px-4 py-1 text-sm font-medium transition-colors',
              filterStatus === 'published'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            Published
          </button>
          <button
            @click="filterStatus = 'draft'"
            :class="[
              'rounded px-4 py-1 text-sm font-medium transition-colors',
              filterStatus === 'draft'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            Drafts
          </button>
        </div>
      </div>
      <div v-if="postsLoading" class="py-8 text-center text-gray-500">
        Loading posts...
      </div>
      <div
        v-else-if="filteredPosts.length === 0"
        class="py-8 text-center text-gray-500"
      >
        No {{ filterStatus === 'all' ? '' : filterStatus }} posts yet.
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="post in filteredPosts"
          :key="post.id"
          class="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="mb-1 text-lg font-semibold">{{ post.title }}</h3>
              <p class="mb-2 text-sm text-gray-600">
                By {{ post.author }} •
                {{ post.published ? 'Published' : 'Draft' }} •
                {{
                  post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : 'No date'
                }}
              </p>
              <div
                v-if="post.tags && post.tags.length > 0"
                class="mt-2 flex flex-wrap gap-1"
              >
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="ml-4 flex gap-2">
              <button
                @click="editPost(post)"
                class="rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                @click="deletePost(post.id!)"
                class="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import postsService from '@/services/posts'
import type {
  PostDTO,
  CreatePostDTO,
  UpdatePostDTO,
} from '@/services/posts/types'
import http from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const loading = ref(false)
const postsLoading = ref(false)
const uploadingImage = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const editingPost = ref<PostDTO | null>(null)
const posts = ref<PostDTO[]>([])
const tagsInput = ref('')
const filterStatus = ref<'all' | 'published' | 'draft'>('all')

const formData = ref<CreatePostDTO>({
  title: '',
  content: '',
  author: '',
  tags: [],
  published: false,
  imageUrl: '',
})

function updateTags() {
  formData.value.tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

function resetForm() {
  formData.value = {
    title: '',
    content: '',
    author: '',
    tags: [],
    published: false,
    imageUrl: '',
  }
  tagsInput.value = ''
  editingPost.value = null
  message.value = ''
}

function editPost(post: PostDTO) {
  editingPost.value = post
  formData.value = {
    title: post.title,
    content: post.content,
    author: post.author,
    tags: post.tags || [],
    published: post.published,
    imageUrl: post.imageUrl || '',
  }
  tagsInput.value = (post.tags || []).join(', ')

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function handleSubmit() {
  if (
    !formData.value.title ||
    !formData.value.content ||
    !formData.value.author
  ) {
    showMessage('Please fill in all required fields', 'error')
    return
  }

  loading.value = true
  message.value = ''

  try {
    if (editingPost.value?.id) {
      // Update existing post
      const updateData: UpdatePostDTO = {
        title: formData.value.title,
        content: formData.value.content,
        author: formData.value.author,
        tags: formData.value.tags,
        published: formData.value.published,
        imageUrl: formData.value.imageUrl || undefined,
      }
      await postsService.updatePost(editingPost.value.id, updateData)
      showMessage('Post updated successfully!', 'success')
    } else {
      // Create new post
      await postsService.createPost(formData.value)
      showMessage('Post created successfully!', 'success')
    }

    resetForm()
    await loadPosts()
  } catch (error: unknown) {
    console.error('Error saving post:', error)
    const errorMessage =
      error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { error?: string } } }).response?.data
            ?.error
        : undefined
    showMessage(
      errorMessage || 'Failed to save post. Please try again.',
      'error',
    )
  } finally {
    loading.value = false
  }
}

async function deletePost(id: string) {
  if (!confirm('Are you sure you want to delete this post?')) {
    return
  }

  try {
    await postsService.deletePost(id)
    showMessage('Post deleted successfully!', 'success')
    await loadPosts()
  } catch (error: unknown) {
    console.error('Error deleting post:', error)
    const errorMessage =
      error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { error?: string } } }).response?.data
            ?.error
        : undefined
    showMessage(
      errorMessage || 'Failed to delete post. Please try again.',
      'error',
    )
  }
}

async function loadPosts() {
  postsLoading.value = true
  try {
    const response = await postsService.getAllPosts(50)
    // Axios wraps response in data property
    posts.value = (response.data || response) as PostDTO[]
  } catch (error) {
    console.error('Error loading posts:', error)
    showMessage('Failed to load posts', 'error')
  } finally {
    postsLoading.value = false
  }
}

// Filtered posts based on status
const filteredPosts = computed(() => {
  if (filterStatus.value === 'all') {
    return posts.value
  } else if (filterStatus.value === 'published') {
    return posts.value.filter(post => post.published)
  } else {
    return posts.value.filter(post => !post.published)
  }
})

async function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validate file type
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ]
  if (!allowedTypes.includes(file.type)) {
    showMessage(
      'Invalid file type. Only images (JPEG, PNG, WebP, GIF) are allowed.',
      'error',
    )
    return
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    showMessage('File size exceeds 10MB limit.', 'error')
    return
  }

  uploadingImage.value = true

  try {
    // Get auth token
    const authStore = useAuthStore()
    const { auth } = await import('@/config/firebaseConfig')
    const user = auth.currentUser

    if (!user) {
      throw new Error('Not authenticated')
    }

    const idToken = await user.getIdToken()
    authStore.user.token = idToken

    // Create FormData
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)

    // Upload to backend
    const response = await http.post('/api/v1/upload/image', uploadFormData, {
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    // Set image URL from response
    formData.value.imageUrl = response.data.url || response.data
    showMessage('Image uploaded successfully!', 'success')
  } catch (error: unknown) {
    console.error('Upload error:', error)
    const errorMessage =
      error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { error?: string } } }).response?.data
            ?.error
        : undefined
    showMessage(
      errorMessage || 'Failed to upload image. Please try again.',
      'error',
    )
  } finally {
    uploadingImage.value = false
    // Reset file input
    if (target) {
      target.value = ''
    }
  }
}

function handleImageError() {
  showMessage('Failed to load image. Please check the URL.', 'error')
}

function showMessage(text: string, type: 'success' | 'error') {
  message.value = text
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
/* Mobile-friendly input font size */
input[type='text'],
input[type='url'] {
  font-size: 16px; /* Prevents zoom on iOS */
}
</style>
