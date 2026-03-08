import React from 'react';

/**
 * Swatch Component
 * Renders a color block using the CSS variables from the actual theme.
 */
function Swatch({ name, variable }: { name: string; variable: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div
        className="w-40 h-40 rounded-2xl shadow-md border border-[var(--v3-card-border)] flex items-center justify-center overflow-hidden relative"
        style={{ backgroundColor: `var(${variable})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest text-[var(--v3-fg)]">
             {variable}
           </span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="font-semibold text-[var(--v3-fg)]">{name}</p>
        <p className="font-mono text-xs text-[var(--v3-muted)] mt-1 px-2 py-1 rounded inline-block">
          {variable}
        </p>
      </div>
    </div>
  );
}

export default function TestingPage() {
  const swatchDefinitions = [
    { name: 'App Background', variable: '--v3-bg' },
    { name: 'Card Surface', variable: '--v3-card' },
    { name: 'Card Border', variable: '--v3-card-border' },
    { name: 'Muted Text', variable: '--v3-muted' },
    { name: 'C0 Color (Skeleton)', variable: '--c0' },
  ];

  return (
    <div className="min-h-screen font-sans">
      
      {/* ── LIGHT MODE PREVIEW ── */}
      <div className="bg-[#fafafa] py-16 px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900">Light Mode</h2>
          <p className="text-neutral-500 mb-10">Pulls directly from :root variables</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {swatchDefinitions.map((s, i) => (
              <Swatch key={i} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* ── DARK MODE PREVIEW ── */}
      <div className="dark bg-[#0a0a0a] py-16 px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-white">Dark Mode</h2>
          <p className="text-neutral-400 mb-10">Pulls directly from .dark variables</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {swatchDefinitions.map((s, i) => (
              <Swatch key={i} {...s} />
            ))}
          </div>
        </div>
      </div>

      <div className="p-10 bg-neutral-100 text-center border-t border-neutral-200">
        <p className="text-sm text-neutral-600">
          <strong>Note:</strong> These swatches use the <code>var(--variable)</code> syntax. 
          Updating <code>globals.css</code> will reflect here immediately.
        </p>
      </div>
    </div>
  );
}
