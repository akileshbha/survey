"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

export default function BaltimoreMap() {
    const [data, setData] = useState<any>(null);
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};


    useEffect(() => {
        const fetchBoundary = async () => {
            try {
                const res = await fetch(
                    'https://overpass-api.de/api/interpreter?data=[out:json];relation["name"="Baltimore"]["boundary"="administrative"];out geom;'
                );

                const json: any = await res.json();

                const coords = json?.elements?.[0]?.members
                    ?.filter((m: any) => m.type === "way")
                    ?.map((m: any) =>
                        m.geometry.map((g: any) => [g.lat, g.lon])
                    ) || [];

                setData({
                    type: "Feature",
                    geometry: {
                        type: "Polygon",
                        coordinates: coords.map((r: any) =>
                            r.map((c: any) => [c[1], c[0]])
                        ),
                    },
                });
            } catch (err) {
                console.error("Failed to load boundary:", err);
            }
        };

        fetchBoundary();
    }, []);

    return (
        <MapContainer
            center={[39.2904, -76.6122]}
            zoom={11}
            style={{ height: "600px", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {data && (
                <GeoJSON data={data as any} style={{ color: "red", weight: 2 }} />
            )}
        </MapContainer>
    );
}
