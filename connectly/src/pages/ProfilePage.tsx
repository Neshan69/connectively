import PlaceholderPanel from '../components/PlaceholderPanel'

export default function ProfilePage() {
  return (
    <PlaceholderPanel
      icon="account_circle"
      title="My Profile"
      description="Your studio identity lives here: how you appear to friends, collaborators and the people you call."
      planned={[
        'Avatar, display name and short bio',
        'Studio tags and the tools you work with',
        'Live presence - the online indicator in the navigation becomes real',
        'Connections list with request and blocking controls',
      ]}
    />
  )
}
