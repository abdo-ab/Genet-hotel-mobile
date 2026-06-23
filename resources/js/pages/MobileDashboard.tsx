import { Head } from '@inertiajs/react';

interface Room {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string | null;
}

interface Props {
    rooms: Room[];
}

export default function MobileDashboard({ rooms }: Props) {
    return (
        <div className="min-h-screen bg-slate-50 p-4 pb-12 font-sans text-slate-800">
            <Head title="Genet Hotel - Mobile App" />

            {/* Minimal Mobile Header */}
            <header className="mb-6 pt-4 flex justify-between items-center">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#5E7960]">Welcome To</span>
                    <h1 className="text-2xl font-bold text-slate-900">Genet Hotel</h1>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" title="Offline Ready"></div>
            </header>

            {/* Room List Grid */}
            <div className="space-y-4">
                {rooms.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl bg-white p-6">
                        <p className="text-sm text-slate-500 font-medium">No rooms cached yet.</p>
                        <p className="text-xs text-slate-400 mt-1">Connect to the internet to automatically sync listings.</p>
                    </div>
                ) : (
                    rooms.map((room) => (
                        <div key={room.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
                            <div className="h-44 bg-slate-100 relative">
                                {room.image ? (
                                    <img src={room.image} className="w-full h-full object-cover" alt={room.title} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Image</div>
                                )}
                                <div className="absolute bottom-3 right-3 bg-[#5E7960] text-white font-bold px-3 py-1 rounded-md text-sm shadow">
                                    {room.price} ETB <span className="text-xs font-normal opacity-80">/ night</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-slate-900">{room.title}</h3>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{room.description}</p>
                                <button className="w-full mt-4 bg-[#5E7960] text-white py-2.5 rounded-lg text-sm font-semibold transition hover:bg-[#4a604c]">
                                    Book Room via App
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}