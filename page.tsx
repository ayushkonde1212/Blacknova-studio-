import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Box, 
  ShieldCheck, 
  Lock, 
  Zap, 
  ShoppingCart, 
  Activity, 
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 luxury-blur border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1 group cursor-pointer">
            <span className="font-headline font-bold text-xl tracking-tighter">BLACKNOVA</span>
            <span className="font-headline font-extralight text-xl tracking-tighter text-secondary-foreground">STUDIO</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#what-i-do" className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground hover:text-white transition-colors">Process</a>
            <a href="#portfolio" className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground hover:text-white transition-colors">Work</a>
            <Link href="/portal">
              <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 transition-all text-[10px] uppercase tracking-[0.2em] font-bold h-9 px-6">
                Client Portal
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-40 md:pt-48 md:pb-64">
          <div className="matte-gradient absolute inset-0 -z-10" />
          <div className="container mx-auto px-6 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-10">
              <Box className="h-3 w-3" />
              The Next Digital Frontier
            </div>
            <h1 className="text-6xl md:text-9xl font-headline font-bold tracking-tighter mb-10 max-w-5xl mx-auto leading-[0.9] text-white">
              Architecting <span className="text-primary italic font-light">luxury</span> digital assets.
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground max-w-2xl mx-auto mb-16 font-light leading-relaxed">
              We design and build ultra-high performance custom websites, sleek web apps, and intelligent dashboards for visionaries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/portal">
                <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-transform rounded-full px-12 h-16 text-base font-semibold shadow-2xl shadow-primary/20">
                  Enter Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="ghost" className="rounded-full px-12 h-16 text-base font-medium text-secondary-foreground hover:text-white transition-colors">
                Our Philosophy
              </Button>
            </div>
          </div>
        </section>

        {/* What I Do Section */}
        <section id="what-i-do" className="py-32 border-t border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-8">Service</h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter text-white">What I Do</h3>
            <p className="text-xl md:text-2xl text-secondary-foreground font-light leading-relaxed mb-16 max-w-3xl mx-auto">
              I build modern websites and web applications with a focus on absolute clarity and high performance. 
              From secure login systems and dynamic dashboards to robust databases, I deliver clean UI with a scalable backend architecture.
            </p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-80">
              <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure Systems
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-foreground">
                <Lock className="h-4 w-4 text-primary" />
                Private Data
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-foreground">
                <Zap className="h-4 w-4 text-primary" />
                Hyper Fast
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-32 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-6">Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">What I Can Build</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                "Business Website",
                "Web App with Login",
                "Admin Dashboard",
                "Ecommerce Engine",
                "Portfolio Site",
                "Custom Portal"
              ].map((title, i) => (
                <div key={i} className="p-10 bg-card border border-white/5 rounded-[2rem] card-hover group">
                  <h4 className="text-2xl font-medium group-hover:text-primary transition-colors tracking-tight">{title}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-32 border-t border-white/5 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
              <div className="max-w-xl">
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-6">Works</h2>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Selected Projects</h3>
              </div>
              <p className="text-secondary-foreground max-w-xs font-light leading-relaxed">
                A curated selection of high-performance platforms delivered to visionary clients.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { name: "Nova Dashboard", type: "Web App", desc: "Real-time analytics for modern logistics.", img: "https://picsum.photos/seed/blacknova_p1/800/600" },
                { name: "Luxe Realty", type: "Website", desc: "A quiet luxury interface for high-end properties.", img: "https://picsum.photos/seed/blacknova_p2/800/600" },
                { name: "Apex Engine", type: "Ecommerce", desc: "Custom-built commerce engine for hardware.", img: "https://picsum.photos/seed/blacknova_p3/800/600" }
              ].map((project, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 mb-8">
                    <Image 
                      src={project.img} 
                      alt={project.name} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      data-ai-hint="interface design"
                    />
                  </div>
                  <div className="space-y-3 px-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{project.type}</p>
                    <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.name}</h4>
                    <p className="text-secondary-foreground text-sm font-light leading-relaxed">{project.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-6">Flow</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">How It Works</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
              {[
                { step: "01", title: "Place your order", desc: "Detail your vision in our secure client portal.", icon: <ShoppingCart className="h-6 w-6" /> },
                { step: "02", title: "Review & build", desc: "We finalize the brief and begin the architectural phase.", icon: <Activity className="h-6 w-6" /> },
                { step: "03", title: "Delivery", desc: "Receive your production-ready digital asset in 2–3 days.", icon: <Send className="h-6 w-6" /> }
              ].map((item, i) => (
                <div key={i} className="relative text-center group">
                  <div className="mx-auto h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-10 relative transition-transform group-hover:scale-110 duration-500">
                    {item.icon}
                    <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-white">{item.title}</h4>
                  <p className="text-secondary-foreground font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Philosophy */}
        <section className="py-32 bg-card/30 border-t border-white/5 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="rounded-[3rem] border border-white/5 overflow-hidden aspect-[21/9] relative group">
              <Image 
                src="https://picsum.photos/seed/blacknova_hero/1920/1080" 
                alt="BlackNova Philosophy" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40"
                data-ai-hint="minimal workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 max-w-2xl">
                <h4 className="text-5xl font-bold mb-6 tracking-tighter text-white">Quiet Luxury in Code</h4>
                <p className="text-xl text-secondary-foreground font-light leading-relaxed">Our philosophy is rooted in minimalism. We remove the noise so your brand's voice can be heard with absolute clarity.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-16 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-sm text-muted-foreground font-light">
            © {new Date().getFullYear()} BlackNova Studio. Handcrafted for excellence.
          </div>
          <div className="flex gap-10">
            {["Twitter", "Instagram", "LinkedIn"].map((social) => (
              <a key={social} href="#" className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-foreground hover:text-white transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
