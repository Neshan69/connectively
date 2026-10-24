import HeroArtwork from '../components/HeroArtwork'
import StudioHub from '../components/StudioHub'
import { useStudioUi } from '../context/StudioUiContext'

/** The NNN Studio home screen - the original Stitch design, now with a hero artwork. */
export default function HomePage() {
  const { select } = useStudioUi()

  return (
    <div className="w-full px-4 py-6 md:py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="order-2 lg:order-1">
          <StudioHub onSelect={select} />
        </div>
        <div className="order-1 lg:order-2">
          <HeroArtwork />
        </div>
      </div>
    </div>
  )
}
