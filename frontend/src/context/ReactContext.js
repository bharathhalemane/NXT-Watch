import React from 'react'

const ReactContext = React.createContext({
  isDark: false,
  setIsDark: () => {},
  savedVideos: [],
  onSaveVideo: () => {},
  onRemoveSaveVideo: () => {},
})

export default ReactContext
