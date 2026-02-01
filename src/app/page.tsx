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
import ClientWrapper from '@/components/ClientWrapper'
import StickyBookButton from '@/components/StickyBookButton'

// Static export - content updates require new build
export const dynamic = 'force-static'

export default async function Home() {
  const content = await getSiteContent()

  return (
    <ClientWrapper content={content}>
      <Header content={content} />
      <main id="main-content" className="pb-24 lg:pb-0">
        <Hero content={content} />
        <MethodsBar content={content} />
        <About content={content} />
        <Services content={content} />
        <Issues content={content} />
        <Format content={content} />
        <FAQ content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
      <StickyBookButton />
    </ClientWrapper>
  )
}
