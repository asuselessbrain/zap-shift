import { MapContainer } from 'react-leaflet/MapContainer'
import 'leaflet/dist/leaflet.css';
import { Marker, Popup, TileLayer } from 'react-leaflet';
import { useLoaderData } from 'react-router';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { Map as LeafletMap } from 'leaflet';

type CoverageArea = {
    region: string;
    district: string;
    city: string;
    covered_area: string[];
    status: "active" | "inactive"; // if only these values are allowed
    flowchart: string; // URL string
    longitude: number;
    latitude: number;
};

const Covarage = () => {
    const position: [number, number] = [23.8103, 90.4125];
    const coverageData: CoverageArea[] = useLoaderData();
    const mapRef = useRef<LeafletMap | null>(null);

    const handleFindLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const search = e.target.value.toLowerCase();

        const location = coverageData.find((c: CoverageArea) => c.district.toLowerCase().includes(search))

        if (location) {
            mapRef.current?.flyTo([location?.latitude, location?.longitude], 12)
        }
    }

    return (
        <section className='max-w-[1440px] mx-auto bg-white p-20'>
            <h2 className='text-6xl font-bold text-secondary'>We are available in 64 districts</h2>
            <div className='my-12'>
                    <input onChange={handleFindLocation} type="text" placeholder="Search your location..." className="border border-primary focus:outline-primary rounded-full px-4 py-2 w-full max-w-lg" />
                
            </div>
            <div className="w-full h-[800px] z-10 relative" >
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="h-[800px]"
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {
                        coverageData?.map((coverage: CoverageArea, i: number) => (
                            <Marker key={i} position={[coverage?.latitude, coverage?.longitude]}>
                                <Popup>
                                    {coverage?.district} <br /> {coverage?.covered_area.map(area => (<span key={area}>{area}, </span>))}
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>
        </section>
    );
};

export default Covarage;
