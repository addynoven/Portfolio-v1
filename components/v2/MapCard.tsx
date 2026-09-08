"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

interface MapCardProps {
  className?: string;
}

const MapCard: React.FC<MapCardProps> = ({ className = "" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [time, setTime] = useState<string>("00:00:00 IST");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options) + " IST");
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      try {
        const L = (await import("leaflet")).default;

        const lat = 23.2599;
        const lng = 77.4126;

        if (mapRef.current && !mapInstanceRef.current) {
          const map = L.map(mapRef.current, {
            center: [lat, lng],
            zoom: 12,
            zoomControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            attributionControl: false,
          });

          mapInstanceRef.current = map;

          // Dark Inverted OpenStreetMap tiles (no API key required, zero watermarks)
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a", "b", "c"],
            maxZoom: 18,
            className: "dark-map-tiles",
          }).addTo(map);

          // Custom pulsing radar marker
          const customIcon = L.divIcon({
            className: "custom-radar-pin",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            html: `
              <div class="relative flex items-center justify-center w-6 h-6">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-[#00FF87] border-2 border-white shadow-[0_0_12px_#00FF87]"></span>
              </div>
            `,
          });

          L.marker([lat, lng], { icon: customIcon }).addTo(map);

          // Force resize after a short delay
          setTimeout(() => {
            map.invalidateSize();
          }, 150);
        }
      } catch (error) {
        console.error("Map init error:", error);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <motion.section
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden rounded-2xl bg-[#080d0d]/90 border border-[#152421] group h-full min-h-[300px] shadow-lg hover:border-[#1e3f34] transition-all duration-300 backdrop-blur-md ${className}`}
      data-purpose="location-card"
    >
      {/* Map Container */}
      <div
        ref={mapRef}
        className="absolute inset-0 z-0"
        style={{ background: "#080d0d", minHeight: "100%" }}
      />

      {/* Top Header Row with // LOCATION tag & Live Time */}
      <div className="absolute z-20 top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          // LOCATION
        </span>
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-white whitespace-nowrap">
            {mounted ? time : "00:00:00 IST"}
          </span>
        </div>
      </div>

      {/* Gradient Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/15 to-transparent z-10" />

      {/* Location & Coordinates at Bottom */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between pointer-events-none">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[8px] text-gray-400 font-mono uppercase tracking-widest">
              Location
            </span>
            <span className="text-[8px] text-[#00FF87] font-mono bg-[#0c221b] px-1.5 py-0.5 rounded border border-[#184435]">
              23.26° N, 77.41° E
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm md:text-base font-bold text-white">
            <FaMapMarkerAlt className="w-3.5 h-3.5 text-[#00FF87]" />
            Bhopal, MP, India
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default MapCard;
