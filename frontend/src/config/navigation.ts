import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  FileTextIcon,
} from '@radix-icons/vue'
import kwamscv from '@/assets/kwamscv-ENG.pdf'

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  // { name: 'Blog', href: '/blog' },
  { name: 'Recipes', href: '/recipes' },
]

export const socialLinks = [
  {
    href: 'https://github.com/KwamsC/kwamsc-website',
    icon: GithubLogoIcon,
    title: 'Visit Github',
  },
  {
    href: 'https://www.linkedin.com/in/kwame-carr-253051123/',
    icon: LinkedinLogoIcon,
    title: 'Visit LinkedIn',
  },
  { href: kwamscv, icon: FileTextIcon, title: 'Check Resume' },
]
