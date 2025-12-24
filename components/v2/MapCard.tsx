"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const MapCard = () => {
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

          // Dark CartoDB tiles
          L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            subdomains: "abcd",
            maxZoom: 19,
          }).addTo(map);

          // Simple marker
          const customIcon = L.divIcon({
            className: "",
            iconSize: [14, 14],
            iconAnchor: [7, 7],
            html: `<div style="width:14px;height:14px;background:#00ff99;border-radius:50%;border:2px solid white;box-shadow:0 0 10px #00ff99;"></div>`,
          });

          L.marker([lat, lng], { icon: customIcon }).addTo(map);

          // Force resize after a short delay
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
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
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-slate-200 dark:border-white/5 group cursor-pointer h-full"
    >
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="absolute inset-0 z-0"
        style={{ background: "#1a1a1a", minHeight: "100%" }}
      />

      {/* Live Time Widget */}
      <div className="absolute z-20 top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-UserAccent animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-white whitespace-nowrap">
            {mounted ? time : "00:00:00 IST"}
          </span>
        </div>
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

      {/* Location */}
      <div className="absolute bottom-3 left-3 z-20">
        <p className="text-[9px] text-gray-400 font-mono uppercase tracking-widest mb-0.5">Current Location</p>
        <div className="flex items-center gap-1.5 text-base font-bold text-white">
          <FaMapMarkerAlt className="w-4 h-4 text-UserAccent" />
          Bhopal, MP, India
        </div>
      </div>
    </motion.div>
  );
};

export default MapCard;
