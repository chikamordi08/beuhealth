'use client'
import { useEffect, useState } from 'react'
import { CalendarDays, User, Stethoscope, LogOut, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { diseaseData } from "@/data/disease";
import Link from 'next/link';


export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [doctor, setDoctor] = useState('')
  const [date, setDate] = useState('')
  const [recentSearches, setRecentSearches] = useState([])


  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('beuhealthUser')
    if (!stored) router.push('/login')
    else setUser(JSON.parse(stored))
  }, [router])

   useEffect(() => {
  const allDiseases = Object.entries(diseaseData);

  // Random 4 diseases
  const randomFour = allDiseases
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(([slug, obj]) => ({
      slug,
      title: obj.title
    }));

  setRecentSearches(randomFour);
}, []);


  const mockDoctors = [
    'Dr. Lynn Okoro – Cardiology',
    'Dr. Ada Lovelace – Neurology',
    'Dr. Ben Carson – Neurosurgery',
    'Dr. Chima Obi – Pediatrics',
    'Dr. Zainab Musa – Dermatology',
    'Dr. Victor Ibeh – Orthopedics',
    'Dr. Amara Johnson – Psychiatry',
    'Dr. Samuel Ade – Radiology',
    'Dr. Ngozi Eze – Internal Medicine',
    'Dr. John Bello – Ophthalmology',
    'Dr. Nneka Uche – Gynecology',
    'Dr. Yusuf Ibrahim – ENT Specialist',
    'Dr. Grace Onah – Family Medicine',
    'Dr. Henry Cole – Oncology',
    'Dr. Aisha Danjuma – Public Health',
  ]

  const handleBook = () => {
    if (!doctor) return alert('Please select a doctor')
    if (!date) return alert('Please select a date')
    const appointment = { doctor, date }
    setAppointments([...appointments, appointment])
    setDoctor('')
    setDate('')
    alert('Appointment booked successfully ✅')
  }

  const handleLogout = () => {
    localStorage.removeItem('beuhealthUser')
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {user.role === 'doctor' ? 'Doctor Dashboard' : 'Patient Dashboard'}
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {user.role === 'patient' && (
        <div className="space-y-8">
          {/* Book Appointment Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Book Appointment</h2>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a Doctor
            </label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="">Select a Doctor</option>
              {mockDoctors.map((d, i) => (
                <option key={i}>{d}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a Date
            </label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />

            <button
              onClick={handleBook}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirm Booking
            </button>
          </div>

          {/* Appointment List */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Your Appointments</h2>
            </div>

            {appointments.length === 0 ? (
              <p className="text-gray-500">No appointments yet.</p>
            ) : (
              <ul className="space-y-2">
                {appointments.map((a, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b border-gray-100 py-2"
                  >
                    <span>{a.doctor}</span>
                    <span className="text-gray-500">{a.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Searches */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
  <div className="flex items-center gap-3 mb-4">
    <Search className="w-5 h-5 text-blue-600" />
    <h2 className="text-lg font-semibold text-gray-800">Your Recent Searches</h2>
  </div>

  <ul className="space-y-3">
    {recentSearches.map((item, i) => (
      <li key={i}>
        <Link
          href={`/disease/english/${item.slug}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
</div>


        </div>
      )}

      {user.role === 'doctor' && (
  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
    <div className="flex items-center gap-3 mb-6">
      <Stethoscope className="w-6 h-6 text-blue-600" />
      <h2 className="text-2xl font-bold text-gray-800">Your Appointed Patients</h2>
    </div>

    <p className="text-gray-500 mb-6">
      Below are your current patients with upcoming appointments.
    </p>

    <div className="space-y-4">
      {[
        {
          name: 'Chidi Nwosu',
          reason: 'Follow-up for Malaria recovery',
          date: '2025-11-12',
          status: 'Pending',
        },
        {
          name: 'Amara Obi',
          reason: 'Routine blood pressure check',
          date: '2025-11-13',
          status: 'Confirmed',
        },
        {
          name: 'Tunde Balogun',
          reason: 'Skin rash & irritation review',
          date: '2025-11-14',
          status: 'Pending',
        },
        {
          name: 'Ngozi Umeh',
          reason: 'Prenatal consultation (2nd trimester)',
          date: '2025-11-15',
          status: 'Completed',
        },
        {
          name: 'Ibrahim Musa',
          reason: 'Post-surgery wound inspection',
          date: '2025-11-16',
          status: 'Pending',
        },
      ].map((patient, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-gray-50 border border-gray-100 rounded-xl p-4 hover:bg-blue-50 transition-colors"
        >
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-gray-600 text-sm">{patient.reason}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">
              {new Date(patient.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                patient.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : patient.status === 'Confirmed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {patient.status}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 border-t border-gray-200 pt-6 text-center">
      <p className="text-sm text-gray-500">
        Showing 5 most recent patients. More data will appear as appointments are added.
      </p>
    </div>
  </div>
)}

    </div>
  )
}
