import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function CanaryPage() {
  return (
    <div className="min-h-screen bg-horror-butter p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-mono text-horror-charcoal mb-4 tracking-wide">
            Vibe Translator Machine
          </h1>
          <p className="text-xl text-horror-shadow font-sans">
            AI-powered music generation from emotional vibes
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="bg-horror-mint border-horror-sage mb-8">
          <CardHeader>
            <CardTitle className="text-3xl text-horror-charcoal">Coming Soon</CardTitle>
            <CardDescription className="text-horror-shadow text-lg">
              Currently under development for the Dumb Things AI Hackathon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-horror-charcoal mb-4">
              Transform your emotional descriptions into playable music using AI-generated chord progressions
              and interactive synthesis.
            </p>
            <p className="text-horror-shadow text-sm">
              Powered by Replicate MusicGen-Chord and Tone.js
            </p>
          </CardContent>
        </Card>

        {/* Example Vibes */}
        <div className="grid gap-4">
          <Card className="bg-horror-lavender border-horror-slate">
            <CardHeader>
              <CardTitle className="text-horror-charcoal">Example Vibe: "Rainy Sunday Morning"</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-horror-shadow">
                Gentle, melancholic chords with soft reverb. Slow tempo around 72 BPM.
                Minor key progressions that feel like watching rain through a window.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-horror-peach border-horror-rust">
            <CardHeader>
              <CardTitle className="text-horror-charcoal">Example Vibe: "Abandoned Carnival"</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-horror-shadow">
                Eerie, slightly dissonant progressions. Wobbly pitch effects and haunting delays.
                Off-kilter rhythms that evoke faded memories and dusty nostalgia.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-horror-sage border-horror-glow">
            <CardHeader>
              <CardTitle className="text-horror-charcoal">Example Vibe: "Late Night Coding Flow"</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-horror-shadow">
                Hypnotic, repetitive patterns. Low-pass filtered synths with steady rhythm.
                Progressive build-up that mirrors deep focus and flow state.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-horror-shadow text-sm">
          <p>Built with React, Vite, Tailwind CSS v4, and shadcn/ui</p>
          <p className="mt-2">Featuring the Pastel Horror aesthetic</p>
        </div>
      </div>
    </div>
  )
}
