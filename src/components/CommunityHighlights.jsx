'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function CommunityHighlights({ lang, data }) {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    // Get both slug and disease data
    const allDiseases = Object.entries(data)
    
    // Randomly pick 5
    const random = allDiseases.sort(() => 0.5 - Math.random()).slice(0, 5)
    
    // Map to add slug property inside each disease object
    const formatted = random.map(([slug, disease]) => ({
      slug,
      ...disease
    }))

    setTopics(formatted)
  }, [data])

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-12">
      <div className="flex items-center gap-3 mb-4">
        <Search className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Most Searched Topics by Community
        </h2>
      </div>
      <ul className="space-y-3">
        {topics.map((topic, i) => (
          <li key={i}>
            <Link
              href={`/disease/${lang}/${topic.slug}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
