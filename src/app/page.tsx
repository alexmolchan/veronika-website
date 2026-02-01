import { getSiteContent } from '@/lib/sanity'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MethodsBar from '@/components/MethodsBar'
import About from '@/components/About'
import Services from '@/components/Services'
import Issues from '@/components/Issues'
import Format from '@/components/Format'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Static export - content updates require new build
export const dynamic = 'force-static'

export default async function Home() {
  const content = await getSiteContent()

  return (
    <>
      <Header content={content} />
      <Hero content={content} />
      <MethodsBar content={content} />
      <About content={content} />
      <Services content={content} />
      <Issues content={content} />
      <Format content={content} />
      <FAQ content={content} />
      <Contact content={content} />
      <Footer content={content} />
    </>
  )
}
