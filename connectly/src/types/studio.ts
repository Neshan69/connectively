/**
 * Shared types for the NNN Studio shell.
 *
 * Every island button and feature card in the Stitch design points at one of
 * these ids. Keeping them in a single place means the navigation can grow into
 * a router later without touching the visual components.
 */

export type Theme = 'dark' | 'light'

export type StudioModuleId =
  | 'profile'
  | 'friends'
  | 'camera'
  | 'inspector'
  | 'code'
  | 'command-palette'
  | 'settings'
  | 'video-call'
  | 'audio-room'
  | 'messages'
  | 'quick-connect'

export type StudioAction = {
  /** Label shown in the toast / used for the aria-label. */
  title: string
  /**
   * Plain statement of what still has to be built for this module.
   * No backend exists yet, so the UI never claims a feature is live.
   */
  note: string
}

export const STUDIO_ACTIONS: Record<StudioModuleId, StudioAction> = {
  profile: {
    title: 'My Profile',
    note: 'Profile screen is not built yet - it needs the auth API and a user model.',
  },
  friends: {
    title: 'Friends & Creative Connections',
    note: 'Connections screen is not built yet - it needs the auth API and a user model.',
  },
  camera: {
    title: 'Camera',
    note: 'Capture studio is not built yet - it needs getUserMedia permissions and an upload API.',
  },
  inspector: {
    title: 'Inspector',
    note: 'Inspector panel is not built yet - it needs a settings API to store filters.',
  },
  code: {
    title: 'Code',
    note: 'Code panel is not built yet - it needs a project/snippet API.',
  },
  'command-palette': {
    title: 'Command Palette',
    note: 'Command palette is not built yet - it will run on the router once pages exist.',
  },
  settings: {
    title: 'Filters & Settings',
    note: 'Settings screen is not built yet - it needs a preferences API.',
  },
  'video-call': {
    title: 'Start Video Call',
    note: 'No signalling server yet, so WebRTC media cannot start.',
  },
  'audio-room': {
    title: 'Join Audio Room',
    note: 'No signalling server yet, so audio rooms cannot be joined.',
  },
  messages: {
    title: 'Compose Message',
    note: 'Messaging is not connected yet - it needs the messages API and the socket layer.',
  },
  'quick-connect': {
    title: 'Quick Connect',
    note: 'Quick connect is not connected yet - it needs the presence API.',
  },
}
