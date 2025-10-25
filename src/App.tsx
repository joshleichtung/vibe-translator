function App() {
  return (
    <div className="min-h-screen bg-horror-butter p-8">
      <h1 className="text-4xl font-mono text-horror-charcoal mb-8">
        Pastel Horror Theme Test
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 bg-horror-mint rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-mint
        </div>
        <div className="h-24 bg-horror-peach rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-peach
        </div>
        <div className="h-24 bg-horror-lavender rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-lavender
        </div>
        <div className="h-24 bg-horror-coral rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-coral
        </div>
        <div className="h-24 bg-horror-rust rounded-lg flex items-center justify-center text-white">
          horror-rust
        </div>
        <div className="h-24 bg-horror-sage rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-sage
        </div>
        <div className="h-24 bg-horror-slate rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-slate
        </div>
        <div className="h-24 bg-horror-charcoal rounded-lg flex items-center justify-center text-horror-glow">
          horror-charcoal
        </div>
        <div className="h-24 bg-horror-glow rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-glow
        </div>
        <div className="h-24 bg-horror-warning rounded-lg flex items-center justify-center text-horror-charcoal">
          horror-warning
        </div>
        <div className="h-24 bg-horror-shadow rounded-lg flex items-center justify-center text-white">
          horror-shadow
        </div>
      </div>

      <div className="mt-8 p-4 bg-horror-mint rounded-lg">
        <p className="font-sans text-horror-charcoal">
          Font Test: Inter (sans) - The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-mono text-horror-shadow mt-2">
          Font Test: JetBrains Mono (mono) - The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  )
}

export default App
