import Loader        from '../components/Loader'
import Navbar        from '../components/Navbar'
import Hero          from '../components/Hero'
import Ticker        from '../components/Ticker'
import Services      from '../components/Services'
import About         from '../components/About'
import Testimonials  from '../components/Testimonials'
import Contact       from '../components/Contact'
import Booking       from '../components/Booking'
import Footer        from '../components/Footer'
import ScrollInit    from '../components/ScrollInit'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <About />
        <Testimonials />
        <Contact />
        <Booking />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollInit />
    </>
  )
}
