import StudioHub from '../components/StudioHub'
import { useStudioUi } from '../context/StudioUiContext'

/** The NNN Studio home screen - the original Stitch design. */
export default function HomePage() {
  const { select } = useStudioUi()

  return <StudioHub onSelect={select} />
}
