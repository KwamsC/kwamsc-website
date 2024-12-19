<script setup lang="ts">
import kc from '@/assets/img/kc.png'
import kwamscv from '@/assets/kwamscv-ENG.pdf'
import { gsap } from 'gsap/gsap-core'
import { useTemplateRef, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  FileTextIcon,
} from '@radix-icons/vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const headerRef = useTemplateRef('header')

onMounted(() => {
  // load()
  gsap.from(headerRef.value?.children || headerRef.value, {
    delay: 0.5,
    duration: 1,
    y: '+100',
    autoAlpha: 0,
    stagger: 0.25,
    ease: 'back.out(1.7)',
  })
})
</script>

<template>
  <!-- Header -->
  <div ref="header" class="container relative min-h-screen overflow-hidden">
    <!-- Image -->
    <img
      :src="kc"
      class="absolute left-0 right-0 mx-auto h-full w-auto max-w-none"
      alt="kc-image"
    />
    <!-- Text -->
    <div class="self-center">
      <h1 class="mb-2 text-7xl font-thin">Kwame Carr</h1>
      <h3 class="my-4 font-medium">
        Full-stack developer & UI/UX designer <br />
        <span class="text-slate-600">Utrecht, The Netherlands</span>
      </h3>

      <div class="my-5 flex gap-1 align-bottom">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="outline"
                class="rounded-full border-black hover:bg-transparent"
              >
                <a
                  class="flex"
                  href="https://github.com/KwamsC/kwamsc-website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogoIcon class="h-5 w-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Github</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="outline"
                class="rounded-full border-black hover:bg-transparent"
              >
                <a
                  class="flex"
                  href="https://www.linkedin.com/in/kwame-carr-253051123/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinLogoIcon class="h-5 w-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Linkedin</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="outline"
                class="rounded-full border-black hover:bg-transparent"
              >
                <a
                  class="flex"
                  :href="kwamscv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileTextIcon class="h-5 w-5" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Resume</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </div>

  <!-- Introduction -->
  <!-- <div class="container min-h-screen bg-white">
    <div id="introduction">
      <p class="text-xl text-slate-600">
        I'm a full-stack developer with a passion for creating engaging digital
        experiences.
      </p>
    </div>
  </div> -->
</template>
