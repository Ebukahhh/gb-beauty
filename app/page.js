import Loader        from '../components/Loader'
import Navbar        from '../components/Navbar'
import Hero          from '../components/Hero'
import Ticker        from '../components/Ticker'
import Services      from '../components/Services'
import About         from '../components/About'
import Team          from '../components/Team'
import Testimonials  from '../components/Testimonials'
import Contact       from '../components/Contact'
import Booking       from '../components/Booking'
import Footer        from '../components/Footer'
import ScrollInit    from '../components/ScrollInit'

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
        <Team />
        <Testimonials />
        <Contact />
        <Booking />
      </main>
      <Footer />
      <ScrollInit />
    </>
  )
}
