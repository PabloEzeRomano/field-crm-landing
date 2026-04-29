import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ForWhom from '@/components/ForWhom'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import Agendar from '@/components/Agendar'
import Footer from '@/components/Footer'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <ForWhom />
      <SocialProof />
      <Pricing />
      <Agendar />
      <Footer />
      <RevealObserver />
    </>
  )
}
