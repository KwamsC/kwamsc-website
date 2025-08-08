<script setup lang="ts">
import { gsap } from 'gsap/gsap-core'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

// Element refs
const headingRef = ref<HTMLElement | null>(null)
const introRef = ref<HTMLElement | null>(null)
const detailsRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // === Heading animation ===
  gsap.from(headingRef.value, {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
  })

  // === Intro text fade-in ===
  gsap.from(introRef.value, {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power2.out',
    delay: 0.3,
  })

  // === Details fade-in on scroll ===
  gsap.from(detailsRef.value, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: detailsRef.value,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  })
})
</script>

<template>
  <section class="container mt-40 max-w-5xl px-8">
    <!-- Heading -->
    <h1
      ref="headingRef"
      class="mb-6 text-5xl font-bold uppercase leading-tight tracking-tighter"
    >
      About Me
    </h1>

    <!-- Intro -->
    <p ref="introRef" class="mb-12 text-xl leading-relaxed text-gray-600">
      I’m Kwame Carr, a full-stack web developer passionate about crafting fast,
      scalable, and visually engaging web experiences. My work bridges the gap
      between design and development, ensuring both exceptional aesthetics and
      robust functionality.
    </p>

    <!-- Details -->
    <div
      ref="detailsRef"
      class="space-y-6 text-lg leading-relaxed text-gray-700"
    >
      <p>
        Over the years, I’ve built projects ranging from interactive marketing
        websites to complex SaaS platforms. I work with modern JavaScript
        frameworks like <strong>Vue</strong>, <strong>React</strong>, and
        <strong>Next.js</strong>, along with Node.js backends powered by
        <strong>Express</strong> or <strong>Fastify</strong>.
      </p>
      <p>
        My focus is on creating digital products that perform flawlessly across
        devices, load quickly, and are accessible to all users. I pay special
        attention to smooth animations, efficient code structure, and
        maintainability.
      </p>
      <p>
        Beyond coding, I enjoy collaborating with designers, marketers, and
        product teams to bring creative ideas to life — always keeping business
        goals and end-user satisfaction at the forefront.
      </p>
    </div>
  </section>
</template>

<style scoped>
.container {
  margin-left: auto;
  margin-right: auto;
}
</style>
