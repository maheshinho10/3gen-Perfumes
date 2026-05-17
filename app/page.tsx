import { HeroSection }         from '@/src/components/sections/HeroSection'
import { BrandStorySection }   from '@/src/components/sections/BrandStorySection'
import { CollectionSection }   from '@/src/components/sections/CollectionSection'
import { TestimonialsSection } from '@/src/components/sections/TestimonialsSection'
import { Footer }              from '@/src/components/layout/Footer'

export default function HomePage() {
  return (
    <main id="main-content" className="overflow-x-hidden" style={{ background: '#07100A' }}>
      <HeroSection />
      <BrandStorySection />
      <CollectionSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
