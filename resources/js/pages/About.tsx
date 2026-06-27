import { Head } from '@inertiajs/react';
import { HeartHandshake, House, MapPin, MoveRight } from 'lucide-react';

const features = [
    { icon: '🌐', title: 'Free Wi-Fi', desc: 'High-speed internet access throughout the property.' },
    { icon: '🍽️', title: 'Restaurant & Bar', desc: 'Enjoy traditional Ethiopian & international cuisine.' },
    { icon: '🅿️', title: 'Free Parking', desc: 'Secure on-site parking for all guests.' },
    { icon: '📞', title: '24/7 Reception', desc: 'Round-the-clock assistance for any need.' },
    { icon: '🛁', title: 'En-suite Bathrooms', desc: 'Private bathrooms in every standard room.' },
    { icon: '❄️', title: 'Air Conditioning', desc: 'Stay comfortable in every season.' },
];

const timeline = [
    { year: 'Founded', desc: 'Established in the heart of Awash 7 kilo with a vision for warm hospitality.' },
    { year: 'Grown', desc: 'Expanded rooms & facilities to serve more guests from Ethiopia and beyond.' },
    { year: 'Today', desc: 'Proudly serving travellers with authentic service and modern comforts.' },
];

export default function About() {
    return (
        <div className="min-h-screen bg-[#F9FAFA] font-sans text-[#36413E] pb-20">
            <Head title="Genet Hotel – About" />

            {/* Hero */}
            <div className="relative bg-[#5E7960] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-[#BEB2C8] opacity-15 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#4a604c] opacity-20 blur-3xl translate-y-1/2" />
                </div>
                <div className="relative z-10 px-5 pt-10 pb-14 text-center text-white">
                    <span className="text-3xl"><House /></span>
                    <h1 className="text-2xl font-extrabold mt-2 mb-2">About Genet Hotel</h1>
                    <div className="w-16 h-1 bg-[#BEB2C8] rounded-full mx-auto mb-3" />
                    <p className="text-sm text-gray-200 max-w-xs mx-auto leading-relaxed">
                        Comfort, warmth and hospitality in the heart of Awash, Ethiopia.
                    </p>
                </div>
                <svg className="w-full -mb-px" viewBox="0 0 1440 36" preserveAspectRatio="none">
                    <path d="M0,36 C360,0 1080,36 1440,0 L1440,36 Z" fill="#F9FAFA" />
                </svg>
            </div>

            {/* Our Story */}
            <div className="px-5 mt-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                    <h2 className="text-base font-bold text-[#36413E] mb-3 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#5E7960] flex items-center justify-center text-white text-xs">📖</span>
                        Our Story
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">
                        Genet Hotel is located in the Afar Region, Ethiopia, situated in the vibrant area of Awash 7 kilo near the Menehariya bus station.
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        We offer comfortable accommodation with standard rooms, a welcoming atmosphere, and essential amenities designed to make every guest's stay enjoyable and memorable.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="px-5 mt-5">
                <h2 className="text-base font-bold text-[#36413E] mb-3">Our Journey</h2>
                <div className="space-y-3">
                    {timeline.map((item, i) => (
                        <div key={i} className="flex gap-4 items-start bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                            <div className="flex-shrink-0 w-16 flex items-center justify-center">
                                <span className="text-[11px] font-bold text-[#5E7960] text-center leading-tight">{item.year}</span>
                            </div>
                            <div className="w-px bg-[#BEB2C8] flex-shrink-0 self-stretch" />
                            <p className="text-xs text-gray-500 leading-relaxed flex-1">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Amenities Grid */}
            <div className="px-5 mt-5">
                <h2 className="text-base font-bold text-[#36413E] mb-3">What We Offer</h2>
                <div className="grid grid-cols-2 gap-3">
                    {features.map((f) => (
                        <div key={f.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-1">
                            <span className="text-2xl">{f.icon}</span>
                            <h3 className="text-sm font-bold text-[#36413E] mt-1">{f.title}</h3>
                            <p className="text-[11px] text-gray-400 leading-tight">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Location */}
            <div className="px-5 mt-5">
                <h2 className="text-base font-bold text-[#36413E] mb-3">Our Location</h2>
                <a
                    href="https://maps.app.goo.gl/kQyyqnQ7wRXapRRq7"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl overflow-hidden shadow-md border border-gray-100 h-48 relative"
                >
                    <iframe
                        src="https://maps.google.com/maps?q=8.992567,40.163479&hl=en&z=15&output=embed"
                        className="pointer-events-none w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute inset-0 flex items-end p-3">
                        <span className="bg-[#5E7960] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                            <MapPin /> Awash 7 kilo, around Menehariya — Open in Maps <span><MoveRight /> </span>
                        </span>
                    </div>
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">
                    Awash 7 kilo around Menehariya bus station, Awash, Ethiopia
                </p>
            </div>

            {/* Mission banner */}
            <div className="px-5 mt-5 mb-4">
                <div className="bg-[#BEB2C8] rounded-2xl p-5 text-[#36413E] text-center">
                    <span className="text-3xl"><HeartHandshake /> </span>
                    <h3 className="font-bold text-base mt-2 mb-1">Our Mission</h3>
                    <p className="text-xs leading-relaxed opacity-80 max-w-xs mx-auto">
                        To provide every guest with a comfortable, affordable, and memorable stay — backed by genuine Ethiopian warmth and hospitality.
                    </p>
                </div>
            </div>
        </div>
    );
}
