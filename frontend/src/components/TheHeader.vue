<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router'
import kwamsc from '@/assets/img/kwamsc.svg'
import gsap from 'gsap'
import { navigation, socialLinks } from '@/config/navigation'
import { onMounted, onBeforeUnmount, useTemplateRef, ref, computed } from 'vue'
import MenuButton from './MenuButton.vue'
import { debounce } from '@/utils/debounce'
import { useAuthStore } from '@/stores/auth'

// Auth
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

// State
const menuIsOpen = ref(false)
const showNav = ref(true)
const isMobile = ref(window.innerWidth < 768)

// Refs
const headerRef = useTemplateRef('header')
const navRef = useTemplateRef('nav')
const menuOverlayRef = useTemplateRef('menu-overlay')
const menuLinksRef = useTemplateRef('menu-links')
const socialIconsRef = useTemplateRef('social-icons')

// Router
const route = useRoute()
const router = useRouter()
const isHome = computed(() => route.name === 'home')

// Timelines
let menuTimeline: gsap.core.Timeline
let socialTimeline: gsap.core.Timeline

// Navigation visibility
const updateNavVisibility = (shouldShow: boolean) => {
  if (isMobile.value || showNav.value === shouldShow) return
  showNav.value = shouldShow
  gsap.to(navRef.value, {
    opacity: shouldShow ? 1 : 0,
    duration: 0.2,
    overwrite: 'auto',
  })
}

// Scroll handler
const handleScroll = () => {
  updateNavVisibility(isHome.value ? window.scrollY > 20 : true)
}

// Menu handling
const setMenuState = (open: boolean) => {
  if (menuIsOpen.value === open) return
  menuIsOpen.value = open
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    // start social icons first so their enter feels snappier
    socialTimeline?.play()
    menuTimeline.play()
  } else {
    // reverse social icons immediately so leave animation happens at once
    socialTimeline?.reverse()
    menuTimeline.reverse()
  }
}

const toggleMenu = () => setMenuState(!menuIsOpen.value)

// Resize handler
const handleResize = debounce(() => {
  const wasMobile = isMobile.value
  isMobile.value = window.innerWidth < 768

  if (isMobile.value) {
    showNav.value = true
    gsap.set(navRef.value, { opacity: 1, clearProps: 'visibility' })
  } else if (wasMobile && isHome.value) {
    const shouldShow = window.scrollY > 20
    showNav.value = shouldShow
    gsap.set(navRef.value, { opacity: shouldShow ? 1 : 0 })
  }
}, 100)

onMounted(() => {
  if (!headerRef.value) return

  const ctx = gsap.context(() => {
    // Initial nav state
    if (isHome.value && !isMobile.value) {
      showNav.value = window.scrollY > 20
    }

    // Menu animation
    if (menuLinksRef.value?.children?.length) {
      gsap.set(menuLinksRef.value.children, { y: 75 })
    }
    if (socialIconsRef.value?.children?.length) {
      gsap.set(socialIconsRef.value.children, { y: 75, opacity: 0 })
    }

    // Main menu timeline (overlay + links)
    menuTimeline = gsap
      .timeline({ paused: true })
      .to(menuOverlayRef.value, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
        ease: 'power4.inOut',
      })
      .to(
        menuLinksRef.value?.children || [],
        {
          y: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.inOut',
        },
        '-=0.75',
      )

    // Separate timeline for social icons so enter can be advanced independently
    socialTimeline = gsap.timeline({ paused: true }).to(
      socialIconsRef.value?.children || [],
      {
        y: 0,
        duration: 0.3,
        stagger: 0.08,
        opacity: 1,
        ease: 'power4.inOut',
      },
      '-=0.1',
    )
  }, headerRef.value!) // scoped to header

  // Event listeners
  const debouncedScroll = debounce(handleScroll, 50)
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('scroll', debouncedScroll, { passive: true })

  // Route change handling
  router.afterEach(() => {
    updateNavVisibility(isHome.value ? window.scrollY > 20 : true)
    setMenuState(false)
  })

  onBeforeUnmount(() => {
    setMenuState(false)
    document.body.style.overflow = ''
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', debouncedScroll)
    ctx.revert() // kills all GSAP animations in this context
  })
})
</script>

<template>
  <!-- Header -->
  <header ref="header" class="pointer-events-none fixed top-0 z-50 w-full">
    <nav
      ref="nav"
      class="container flex items-center justify-between py-8"
      :class="{ visible: showNav, invisible: !showNav }"
    >
      <router-link to="/" class="pointer-events-initial" ref="logo">
        <img :src="kwamsc" width="54" alt="KwamsC logo" />
      </router-link>
      <div class="flex items-center gap-4">
        <button
          v-if="authStore.user.loggedIn"
          @click="handleLogout"
          class="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors pointer-events-initial hover:bg-stone-700"
        >
          Logout
        </button>
        <MenuButton
          :is-open="menuIsOpen"
          @toggle="toggleMenu"
          class="pointer-events-initial"
        />
      </div>
    </nav>
  </header>

  <!-- Menu Overlay -->
  <div
    ref="menu-overlay"
    class="fixed inset-0 z-40 bg-stone-200"
    :style="{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }"
  >
    <div
      class="container flex h-full flex-col items-center justify-center py-32"
    >
      <div
        class="flex flex-col items-start justify-between gap-24 md:flex-row-reverse md:items-end md:justify-end"
      >
        <div ref="social-icons" class="flex gap-4 pb-4 will-change-transform">
          <a
            v-for="(icon, idx) in socialLinks"
            :key="idx"
            class="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#CCCCCC] transition-all duration-700 will-change-transform"
            :href="icon.href"
            :title="icon.title"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              class="absolute inset-0 scale-0 rounded-full bg-black transition-transform duration-700 ease-in-out group-hover:scale-100"
            ></div>
            <component
              :is="icon.icon"
              class="relative z-10 h-5 w-5 text-black transition-colors duration-700 ease-in-out group-hover:text-white"
            />
          </a>
        </div>
        <div
          ref="menu-links"
          class="space-y-4 [&:hover>a:not(:hover)]:opacity-50"
        >
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="group block cursor-pointer overflow-hidden py-2 text-6xl font-bold transition-opacity duration-300 md:text-8xl"
            @click="toggleMenu"
          >
            <span class="relative">
              {{ item.name }}
              <span
                class="absolute bottom-0 left-0 h-1 w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
              />
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Navigation -->
  <div
    ref="nav-items"
    class="pointer-events-none absolute top-8 z-30 ml-[50%] px-3 md:pointer-events-auto"
  >
    <div
      class="hidden md:flex md:flex-col [&:hover>div:not(:hover)]:opacity-50"
    >
      <div
        v-for="item in navigation"
        :key="item.name"
        class="transition-opacity duration-300 ease-in-out"
      >
        <router-link
          :to="item.href"
          class="group block w-fit cursor-pointer overflow-hidden py-1 text-2xl font-bold leading-5 text-gray-900"
        >
          <span class="relative">
            {{ item.name }}
            <span
              class="absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-300 ease-out group-hover:w-full"
            />
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
