import PlaceholderPanel from '../components/PlaceholderPanel'

export default function SettingsPage() {
  return (
    <PlaceholderPanel
      icon="pageview"
      title="Filters & Settings"
      description="Preferences for how the studio looks and behaves, plus the privacy controls behind every call."
      planned={[
        'Appearance - theme, accent and canvas filters',
        'Privacy - who can reach you and who can record a call',
        'Notifications - messages, invites and connection requests',
        'Devices - camera, microphone and spatial audio output',
      ]}
    />
  )
}
