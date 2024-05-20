export const setDarkMode = (mode: boolean) => {
  const colorScheme = mode ? 'dark' : 'light'
  document.documentElement.setAttribute('data-color-scheme', colorScheme)

  localStorage.setItem('isDarkMode', mode.toString())
}
