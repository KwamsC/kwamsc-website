<script setup lang="ts">
import img from '@/assets/img/IMG_5661.jpg'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ref, onMounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

const headerRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const nameInnerRef = ref<HTMLElement | null>(null)
const introTextRef = ref<HTMLElement | null>(null)
const introSectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    const lines = gsap.utils.toArray<HTMLElement>('.line-inner')

    // === Header intro animation ===
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(nameInnerRef.value, {
      yPercent: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
    tl.from(
      lines,
      {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      },
      '-=0.8',
    )

    // === Overlay fade ===
    gsap.to(overlayRef.value, {
      opacity: 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top top',
        end: 'bottom center',
        scrub: true,
      },
    })

    // === Desktop parallax ===
    gsap.to(headerRef.value, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: headerRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // === Intro section parallax ===
    gsap.fromTo(
      introSectionRef.value,
      { yPercent: 10 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: introSectionRef.value,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      },
    )

    // === Intro text fade-in ===
    gsap.from(introTextRef.value, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: introTextRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  })

  return () => ctx.revert()
})
</script>

<template>
  <!-- Header Section -->
  <section
    ref="headerRef"
    class="relative overflow-hidden will-change-transform md:min-h-screen"
  >
    <div
      ref="overlayRef"
      class="will-change-opacity absolute inset-0 z-10 hidden bg-black/70 opacity-0 md:block"
      aria-hidden="true"
    />

    <div
      class="container relative z-20 flex h-screen flex-col px-8 md:justify-between"
    >
      <div class="mx-auto w-full max-w-6xl pt-32"></div>

      <div
        class="relative flex h-full w-full flex-col-reverse justify-between py-16 md:h-auto md:flex-col md:py-4"
      >
        <div class="mb-6 max-w-2xl">
          <h1 class="mb-3">
            <span class="line block overflow-hidden">
              <span class="line-inner block text-xl font-medium"
                >Full-Stack Web Developer</span
              >
            </span>
          </h1>
          <div class="space-y-1 text-gray-600">
            <span class="line block overflow-hidden">
              <span class="line-inner block"
                >Building high-performance websites</span
              >
            </span>
            <span class="line block overflow-hidden">
              <span class="line-inner block"
                >and scalable web applications</span
              >
            </span>
            <span class="line block overflow-hidden">
              <span class="line-inner block"
                >with modern technologies and clean code.</span
              >
            </span>
          </div>
        </div>

        <div class="overflow-hidden">
          <h1
            ref="nameInnerRef"
            class="text-5xl font-bold uppercase leading-none tracking-tighter md:text-[12vw]"
          >
            Kwame <span class="font-extrabold">Carr</span>
          </h1>
        </div>
      </div>
    </div>

    <!-- Desktop image -->
    <div
      class="absolute inset-y-0 right-0 z-0 hidden w-1/2 overflow-hidden bg-gray-100 md:block"
    >
      <img
        :src="img"
        alt="Kwame Carr"
        class="relative hidden h-full w-full object-cover contrast-50 will-change-transform md:block"
      />
    </div>
  </section>

  <!-- Introduction Section -->
  <section
    ref="introSectionRef"
    class="relative z-30 bg-white will-change-transform"
  >
    <!-- Mobile image -->
    <img
      :src="img"
      alt="Kwame Carr"
      class="relative min-h-screen w-full object-cover grayscale will-change-transform md:hidden"
    />

    <!-- Intro text -->
    <div ref="introTextRef" class="mx-auto min-h-screen max-w-4xl px-8 pt-32">
      <p class="text-xl leading-relaxed text-gray-600">
        I’m a full-stack web developer specializing in crafting fast,
        responsive, and user-friendly websites. From intuitive front-end
        interfaces to robust back-end systems, I use modern frameworks, APIs,
        and databases to deliver solutions that are as scalable as they are
        visually engaging. My goal is to help brands, businesses, and agencies
        bring their digital ideas to life with clean code, smooth animations,
        and exceptional performance.
      </p>
    </div>
  </section>
</template>

<style scoped>
.line {
  overflow: hidden;
}
.line-inner {
  display: block;
}
</style>
