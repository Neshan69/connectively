import PlaceholderPanel from '../components/PlaceholderPanel'

export default function MessagesPage() {
  return (
    <PlaceholderPanel
      icon="forum"
      title="Messages"
      description="Encrypted conversations will live here, alongside the studio canvas drops that can be shared inside a thread."
      planned={[
        'Conversation list with unread counts and search',
        'End-to-end encrypted threads with read receipts and reactions',
        'Interactive canvas drops shared straight into a conversation',
        'Live delivery over the socket layer, with typing indicators',
      ]}
    />
  )
}
