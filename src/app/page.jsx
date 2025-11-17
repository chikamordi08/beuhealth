import {Globe, MessageCircle, ChevronRight, Search, Heart} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50/30">
      <main className="container mx-auto px-6 py-16">
        <section className="max-w-3xl mx-auto text-center space-y-8">
          {/* Hero */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Your Community Healthspace
            </div>
            <h1 className="text-5xl font-bold text-gray-800 leading-tight">
              Welcome to <span className="text-blue-600">BeuHealth</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gain simple health knowledge to improve your well-being. Available in English and Nigerian Pidgin.
            </p>
          </div>

          {/* Language Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <a 
              href="/disease?lang=pidgin" 
              className="group relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pidgin</h3>
                  <p className="text-gray-500 text-sm">Wetin you need to know about your health</p>
                </div>
                <ChevronRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <a 
              href="/disease?lang=english" 
              className="group relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">English</h3>
                  <p className="text-gray-500 text-sm">Clear health information in standard English</p>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 text-left">
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Easy Search</h4>
              <p className="text-sm text-gray-500">Find health information quickly and easily</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Local Language</h4>
              <p className="text-sm text-gray-500">Information in both English and Pidgin</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Community First</h4>
              <p className="text-sm text-gray-500">Built for the Nigerian community</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}