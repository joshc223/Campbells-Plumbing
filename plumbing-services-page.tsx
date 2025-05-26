"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, X } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const fixtures = [
  {
    name: "Modern Kitchen Faucet",
    image: "/images/elegant-gold-faucet.png",
    priceOptions: {
      economy: "$200 - $350",
      standard: "$400 - $650",
      premium: "$700 - $1,200",
    },
    category: "Kitchen",
  },
  {
    name: "Garbage Disposal",
    image: "/images/garbage-disposal.png",
    priceOptions: {
      economy: "$150 - $250",
      standard: "$300 - $450",
      premium: "$500 - $750",
    },
    category: "Kitchen",
  },
  {
    name: "High-Efficiency Toilet",
    image: "/images/high-efficiency-toilet.png",
    priceOptions: {
      economy: "$300 - $500",
      standard: "$550 - $800",
      premium: "$900 - $1,500",
    },
    category: "Bathroom",
  },
  {
    name: "Luxury Shower Head",
    image: "/images/luxury-shower-head.png",
    priceOptions: {
      economy: "$150 - $250",
      standard: "$300 - $500",
      premium: "$600 - $1,000",
    },
    category: "Bathroom",
  },
  {
    name: "Undermount Bathroom Sink",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$200 - $350",
      standard: "$400 - $650",
      premium: "$700 - $1,200",
    },
    category: "Bathroom",
  },
  {
    name: "Freestanding Bathtub",
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$1,200 - $2,000",
      standard: "$2,500 - $4,000",
      premium: "$5,000 - $8,500",
    },
    category: "Bathroom",
  },
  {
    name: "Bathroom Vanity",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$500 - $800",
      standard: "$900 - $1,500",
      premium: "$1,800 - $3,500",
    },
    category: "Bathroom",
  },
  {
    name: "Tankless Water Heater",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$1,500 - $2,500",
      standard: "$2,800 - $4,000",
      premium: "$4,500 - $6,500",
    },
    category: "Water Heaters",
  },
  {
    name: "Traditional Water Heater",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$800 - $1,200",
      standard: "$1,400 - $2,000",
      premium: "$2,200 - $3,200",
    },
    category: "Water Heaters",
  },
  {
    name: "Hybrid Water Heater",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$2,000 - $3,000",
      standard: "$3,200 - $4,500",
      premium: "$5,000 - $7,000",
    },
    category: "Water Heaters",
  },
  {
    name: "Whole House Water Filter",
    image: "/images/whole-house-water-filter.png",
    priceOptions: {
      economy: "$600 - $1,000",
      standard: "$1,200 - $2,000",
      premium: "$2,500 - $4,000",
    },
    category: "Water Filtration",
  },
  {
    name: "Under Sink Water Filter",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$200 - $350",
      standard: "$400 - $650",
      premium: "$750 - $1,200",
    },
    category: "Water Filtration",
  },
  {
    name: "Reverse Osmosis System",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$400 - $650",
      standard: "$750 - $1,200",
      premium: "$1,400 - $2,200",
    },
    category: "Water Filtration",
  },
  {
    name: "Sump Pump",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$400 - $700",
      standard: "$800 - $1,300",
      premium: "$1,500 - $2,500",
    },
    category: "Pumps & Drains",
  },
  {
    name: "Sewage Ejector Pump",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$700 - $1,100",
      standard: "$1,200 - $1,800",
      premium: "$2,000 - $3,200",
    },
    category: "Pumps & Drains",
  },
  {
    name: "Floor Drain",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$100 - $200",
      standard: "$250 - $400",
      premium: "$450 - $700",
    },
    category: "Pumps & Drains",
  },
  {
    name: "Outdoor Spigot",
    image: "/images/outdoor-spigot.png",
    priceOptions: {
      economy: "$100 - $200",
      standard: "$250 - $400",
      premium: "$450 - $700",
    },
    category: "Outdoor Plumbing",
  },
  {
    name: "Sprinkler System",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center",
    priceOptions: {
      economy: "$2,500 - $4,000",
      standard: "$4,500 - $7,500",
      premium: "$8,000 - $15,000",
    },
    category: "Outdoor Plumbing",
  },
]

interface QuoteRequest {
  fixtureName: string
  priceOption: string
  priceRange: string
  category: string
}

export default function PlumbingServicesPage() {
  const [selectedFixture, setSelectedFixture] = useState<(typeof fixtures)[0] | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [quoteRequest, setQuoteRequest] = useState<QuoteRequest | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const categories = [
    "All",
    "Kitchen",
    "Bathroom",
    "Water Heaters",
    "Water Filtration",
    "Pumps & Drains",
    "Outdoor Plumbing",
  ]

  const filteredFixtures =
    selectedCategory === "All" ? fixtures : fixtures.filter((f) => f.category === selectedCategory)

  const handlePriceOptionClick = (fixture: (typeof fixtures)[0], option: string) => {
    const priceRange = fixture.priceOptions[option as keyof typeof fixture.priceOptions]
    setQuoteRequest({
      fixtureName: fixture.name,
      priceOption: option,
      priceRange: priceRange,
      category: fixture.category,
    })
    setSelectedFixture(null)
    setShowQuoteForm(true)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ...quoteRequest,
        }),
      })

      if (response.ok) {
        setSubmitMessage("Quote request sent successfully! We'll contact you soon.")
        setFormData({ fullName: "", phoneNumber: "", address: "" })
        setQuoteRequest(null)
        setTimeout(() => {
          setShowQuoteForm(false)
          setSubmitMessage("")
        }, 3000)
      } else {
        setSubmitMessage("Error sending quote request. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Error sending quote request. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-4 text-yellow-400">Explore Our Elegant Plumbing Fixtures</h2>

      <p className="text-xl text-center mb-6 text-yellow-200">Free Estimate Gallery</p>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="text-sm"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10">
        {filteredFixtures.map((fixture, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer text-center shadow-md rounded-2xl p-4 border bg-gray-900 hover:shadow-xl hover:shadow-white hover:border-white transition-all duration-300"
            onClick={() => setSelectedFixture(fixture)}
          >
            <Image
              src={fixture.image || "/placeholder.svg"}
              alt={fixture.name}
              width={200}
              height={150}
              className="mx-auto rounded-xl object-cover"
              crossOrigin="anonymous"
            />
            <h3 className="mt-4 text-lg font-semibold text-yellow-400">{fixture.name}</h3>
            <p className="text-yellow-200 text-xs mt-1">{fixture.category}</p>
            <Button variant="ghost" className="mt-2 text-sm text-yellow-400">
              <PlusCircle className="inline mr-1 w-4 h-4" /> View Price Options
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Fixture Details Modal */}
      <AnimatePresence>
        {selectedFixture && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFixture(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-xl p-6 max-w-lg w-full relative text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" className="absolute top-3 right-3" onClick={() => setSelectedFixture(null)}>
                <X className="w-5 h-5 text-yellow-400" />
              </Button>
              <Image
                src={selectedFixture.image || "/placeholder.svg"}
                alt={selectedFixture.name}
                width={400}
                height={300}
                className="mx-auto rounded-lg mb-4 object-cover"
                crossOrigin="anonymous"
              />
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">{selectedFixture.name}</h3>
              <p className="text-yellow-200 text-sm mb-6">{selectedFixture.category}</p>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => handlePriceOptionClick(selectedFixture, "premium")}
                  className="w-full bg-black rounded-lg p-4 border border-yellow-600 hover:border-yellow-400 hover:bg-gray-800 transition-all duration-200"
                >
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Premium</h4>
                  <p className="text-yellow-200 text-lg font-bold">{selectedFixture.priceOptions.premium}</p>
                  <p className="text-yellow-200 text-sm mt-1">Top-tier quality with premium features</p>
                </button>

                <button
                  onClick={() => handlePriceOptionClick(selectedFixture, "standard")}
                  className="w-full bg-black rounded-lg p-4 border border-yellow-600 hover:border-yellow-400 hover:bg-gray-800 transition-all duration-200"
                >
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Standard</h4>
                  <p className="text-yellow-200 text-lg font-bold">{selectedFixture.priceOptions.standard}</p>
                  <p className="text-yellow-200 text-sm mt-1">Great quality with essential features</p>
                </button>

                <button
                  onClick={() => handlePriceOptionClick(selectedFixture, "economy")}
                  className="w-full bg-black rounded-lg p-4 border border-yellow-600 hover:border-yellow-400 hover:bg-gray-800 transition-all duration-200"
                >
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Economy</h4>
                  <p className="text-yellow-200 text-lg font-bold">{selectedFixture.priceOptions.economy}</p>
                  <p className="text-yellow-200 text-sm mt-1">Budget-friendly with reliable performance</p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Request Form Modal */}
      <AnimatePresence>
        {showQuoteForm && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuoteForm(false)}
          >
            <motion.div
              className="bg-gray-900 rounded-xl p-6 max-w-md w-full relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="ghost" className="absolute top-3 right-3" onClick={() => setShowQuoteForm(false)}>
                <X className="w-5 h-5 text-yellow-400" />
              </Button>

              <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Request Quote</h3>

              {quoteRequest && (
                <div className="bg-black rounded-lg p-4 border border-yellow-600 mb-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">{quoteRequest.fixtureName}</h4>
                  <p className="text-yellow-200 text-sm">
                    Option: {quoteRequest.priceOption.charAt(0).toUpperCase() + quoteRequest.priceOption.slice(1)}
                  </p>
                  <p className="text-yellow-200 text-sm">Price Range: {quoteRequest.priceRange}</p>
                </div>
              )}

              {submitMessage && (
                <div className="bg-yellow-600 text-black p-3 rounded-lg mb-4 text-center">{submitMessage}</div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-yellow-400">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="bg-black border-yellow-600 text-yellow-200 focus:border-yellow-400"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-yellow-400">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    className="bg-black border-yellow-600 text-yellow-200 focus:border-yellow-400"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-yellow-400">
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="bg-black border-yellow-600 text-yellow-200 focus:border-yellow-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-600 text-black hover:bg-yellow-400 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Quote Request"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
