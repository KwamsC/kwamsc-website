<script setup lang="ts">
import { ref, watch } from 'vue'
import { gsap } from 'gsap'
import { onMounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const buttonRef = ref<HTMLElement | null>(null)
const line1Ref = ref<HTMLElement | null>(null)
const line2Ref = ref<HTMLElement | null>(null)
const cross1Ref = ref<HTMLElement | null>(null)
const cross2Ref = ref<HTMLElement | null>(null)
const circleRef = ref<HTMLElement | null>(null)

let timeline: gsap.core.Timeline

onMounted(() => {
  // Initial setup
  gsap.set([cross1Ref.value, cross2Ref.value], {
    width: 0,
    opacity: 0,
    rotate: 0,
  })
  gsap.set([line1Ref.value, line2Ref.value], {
    width: '2rem',
    opacity: 1,
  })
  gsap.set(circleRef.value, {
    scale: 0,
    transformOrigin: '50% 50%',
  })

  // Create the timeline
  timeline = gsap
    .timeline({ paused: true })
    .addLabel('start')
    // Fade out hamburger lines
    .to(line1Ref.value, {
      width: 0,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.inOut',
    })
    .to(
      line2Ref.value,
      {
        width: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      },
      '-=0.15',
    ) // Stagger the second line

    // Animate circle
    .addLabel('circle', '-=0.05')
    .to(
      circleRef.value,
      {
        scale: 1,
        duration: 0.25,
        ease: 'power2.inOut',
      },
      'circle',
    )
    // Fade in cross
    .addLabel('cross', '-=0.1')
    .set(
      [cross1Ref.value, cross2Ref.value],
      {
        opacity: 1,
      },
      'cross',
    )
    .to(
      cross1Ref.value,
      {
        width: '2rem',
        rotate: 45,
        duration: 0.25,
        ease: 'power2.out',
      },
      'cross',
    )
    .to(
      cross2Ref.value,
      {
        width: '2rem',
        rotate: -45,
        duration: 0.25,
        ease: 'power2.out',
      },
      'cross+=0.15',
    ) // Stagger the second line
})

watch(
  () => props.isOpen,
  isOpen => {
    if (isOpen) {
      timeline.play()
    } else {
      timeline.reverse()
    }
  },
)

const handleClick = () => {
  emit('toggle')
}
</script>

<template>
  <button
    ref="buttonRef"
    @click="handleClick"
    class="pointer-events-auto relative h-16 w-16 cursor-pointer overflow-hidden"
    aria-label="Toggle menu"
  >
    <div
      class="absolute inset-0 flex flex-col items-center justify-center space-y-2"
    >
      <!-- Hamburger lines -->
      <span ref="line1Ref" class="h-[2px] origin-center bg-gray-900" />
      <span ref="line2Ref" class="h-[2px] origin-center bg-gray-900" />
    </div>

    <!-- Cross lines -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="relative h-8 w-8">
        <!-- Circle -->
        <span
          ref="circleRef"
          class="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCDCDC]"
        />
        <span
          ref="cross1Ref"
          class="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 bg-gray-900"
        />
        <span
          ref="cross2Ref"
          class="absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 bg-gray-900"
        />
      </div>
    </div>
  </button>
</template>
