export const debounce = (fn: () => void, delay = 50) => {
  let timeout: number
  return () => {
    clearTimeout(timeout)
    timeout = window.setTimeout(fn, delay)
  }
}
