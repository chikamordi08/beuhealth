import { diseaseData, englishDiseaseData } from '@/data/disease'
import Link from 'next/link'
import { ArrowLeft, AlertCircle, CheckCircle, Activity, Stethoscope, Pill, Shield, BookOpen } from 'lucide-react'
import TextToSpeech from '@/components/TextToSpeech'
import CommunityHighlights from '@/components/CommunityHighlights'


// Icon mapping for different sections
const getSectionIcon = (key) => {
  const iconMap = {
    symptoms: Activity,
    causes: AlertCircle,
    treatment: Pill,
    prevention: Shield,
    diagnosis: Stethoscope,
    overview: BookOpen,
    description: BookOpen,
    comment: BookOpen,
  }
  
  const normalizedKey = key.toLowerCase().replace(/_/g, '')
  return iconMap[normalizedKey] || BookOpen
}

export default async function DiseasePage({ params }) {
  const { lang, slug } = await params

  try {
    const data = lang === 'english' ? englishDiseaseData : diseaseData
    const disease = data[slug]

    if (!disease) {
      return (
        <div className="max-w-4xl mx-auto py-16 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Disease Not Found</h2>
          <p className="text-gray-500 mb-6">The disease you're looking for doesn't exist.</p>
          <Link 
            href={`/disease?lang=${lang}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Diseases
          </Link>
        </div>
      )
    }

    // Helper to render values
    const renderValue = (val) => {
      if (Array.isArray(val)) {
        return (
          <ul className="space-y-3 mt-4">
            {val.map((item, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-200 transition-colors">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 leading-relaxed flex-1">{item}</span>
              </li>
            ))}
          </ul>
        )
      } else if (typeof val === 'object' && val !== null) {
        return (
          <div className="mt-4 space-y-6">
            {Object.entries(val).map(([subKey, subVal]) => (
              <div key={subKey} className="pl-6 border-l-2 border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2 capitalize">
                  {subKey.replace(/_/g, ' ')}
                </h4>
                {renderValue(subVal)}
              </div>
            ))}
          </div>
        )
      } else {
        return <p className="mt-4 text-gray-700 leading-relaxed text-lg">{val}</p>
      }
    }

    // Extract overview if it exists
    const overview = disease.overview || disease.description || disease.comment || ''

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href={`/disease?lang=${lang}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to {lang === 'english' ? 'English' : 'Pidgin'} Diseases</span>
        </Link>

        {/* Hero Section */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 mb-8 shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
              Health Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {disease.title}
            </h1>
            {overview && (
              <p className="text-blue-100 text-lg leading-relaxed">
                {Array.isArray(overview) ? overview[0] : overview}
              </p>
            )}
            <div className="mt-4">
              <TextToSpeech
                text={
                  `${disease.title}. ${
                  Array.isArray(overview) ? overview.join(' ') : overview
                  }`
               }
            />
          </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {Object.entries(disease).map(([k, v]) => {
            if (k === 'title' || k === 'overview' || k === 'description') return null
            
            const Icon = getSectionIcon(k)
            
            return (
              <section 
                key={k} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-linear-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">
                      {k.replace(/_/g, ' ')}
                    </h2>
                  </div>
                </div>
                <div className="px-8 py-6">
                  {renderValue(v)}
                </div>
              </section>
            )
          })}
        </div>

        {/* Community Highlights */}
        <CommunityHighlights lang={lang} data={data} />

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Important Medical Disclaimer</h3>
              <p className="text-amber-800 leading-relaxed">
                This information is for educational purposes only and should not replace professional medical advice. 
                Always consult with a qualified healthcare provider for diagnosis and treatment of any medical condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (err) {
    console.error(err)
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Disease</h2>
        <p className="text-gray-500 mb-6">Something went wrong while loading this information.</p>
        <Link 
          href={`/disease?lang=${lang}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Diseases
        </Link>
      </div>
    )
  }
}