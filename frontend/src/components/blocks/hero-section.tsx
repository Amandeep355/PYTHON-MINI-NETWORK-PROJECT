'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Menu, X, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { useScroll } from 'framer-motion'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <section>
                    <div className="relative pt-24">
                        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"></div>
                        <div className="mx-auto max-w-5xl px-6">
                            <div className="sm:mx-auto lg:mr-auto text-center flex flex-col items-center">
                                <AnimatedGroup
                                    className="flex flex-col items-center"
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                >
                                    <h1
                                        className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16">
                                        Monitor & Analyze 10x faster with Network Monitor
                                    </h1>
                                    <p
                                        className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground">
                                        Comprehensive view of device health, traffic patterns, and alerts across your entire network infrastructure.
                                    </p>
                                    <div className="mt-12 flex items-center gap-2 justify-center">
                                        <div
                                            key={1}
                                            className="bg-foreground/10 rounded-[14px] border p-0.5">
                                            <Button
                                                asChild
                                                size="lg"
                                                className="rounded-xl px-5 text-base">
                                                <Link href="#dashboard">
                                                    <span className="text-nowrap">View Dashboard</span>
                                                </Link>
                                            </Button>
                                        </div>
                                        <Button
                                            key={2}
                                            asChild
                                            size="lg"
                                            variant="ghost"
                                            className="h-[42px] rounded-xl px-5 text-base">
                                            <Link href="#topology">
                                                <span className="text-nowrap">View Topology</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    {/* Placeholder for actual dashboard screen */}
                                    <div className="bg-zinc-900 aspect-[16/9] w-full rounded-2xl border border-zinc-800 flex items-center justify-center">
                                        <Activity className="w-24 h-24 text-zinc-700" />
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                <section className="bg-background pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <Link
                                href="#dashboard"
                                className="block text-sm duration-150 hover:opacity-75">
                                <span> View Live Data</span>
                                <ChevronRight className="ml-1 inline-block size-3" />
                            </Link>
                        </div>
                        <div className="group-hover:blur-sm mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            {/* Dummy network nodes logos */}
                            {[1,2,3,4,5,6,7,8].map(i => (
                                <div key={i} className="flex justify-center">
                                    <div className="h-6 w-24 bg-zinc-800 rounded opacity-50 dark:bg-zinc-200"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Inventory', href: '#inventory' },
    { name: 'Trends', href: '#trends' },
    { name: 'Topology', href: '#topology' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)

    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('group fixed top-0 z-50 w-full border-b transition-colors duration-150', scrolled ? 'bg-background/80 backdrop-blur-3xl' : 'bg-transparent border-transparent')}>
                <div className="mx-auto max-w-5xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Activity className="w-6 h-6 text-primary" />
                                <span className="font-bold text-lg">NetMon</span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm font-medium">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
