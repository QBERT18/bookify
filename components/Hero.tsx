import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const Hero = () => {
  return (
    <section className="wrapper px-6 py-8 md:px-10 lg:px-16 mb-10 md:mb-16">
      <div className="bg-[#f3e4c7] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Part */}
        <div className="flex-1 space-y-6 max-w-md">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#212a3b]">
            Your Library
          </h1>
          <p className="text-[#3d485e] text-lg leading-relaxed">
            Convert your books into interactive AI conversations. Listen, learn, and discuss your favorite reads.
          </p>
          <Button className="bg-white text-[#212a3b] hover:bg-white/90 rounded-xl px-6 py-6 text-lg font-semibold shadow-sm border-none">
            <Plus className="w-5 h-5 mr-2" />
            Add new book
          </Button>
        </div>

        {/* Middle Part */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-full max-w-[400px] aspect-square">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Part */}
        <div className="flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm w-full md:w-[280px] space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#212a3b]">Upload PDF</h3>
                <p className="text-sm text-gray-500">Add your book file</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#212a3b]">AI Processing</h3>
                <p className="text-sm text-gray-500">We analyze the content</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-[#212a3b]">Voice Chat</h3>
                <p className="text-sm text-gray-500">Discuss with AI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
