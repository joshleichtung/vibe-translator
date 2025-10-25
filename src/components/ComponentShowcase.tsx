import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

export const ComponentShowcase: FC = () => {
  const [sliderValue, setSliderValue] = useState([50])
  const [progressValue] = useState(66)

  return (
    <div className="min-h-screen bg-horror-butter p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-mono text-horror-charcoal mb-4 tracking-wider">
          shadcn/ui Component Showcase
        </h1>
        <p className="text-horror-shadow font-sans mb-8">
          Pastel Horror Theme Integration
        </p>

        {/* Buttons Section */}
        <Card className="bg-horror-mint/30 border-horror-sage">
          <CardHeader>
            <CardTitle className="font-mono text-2xl text-horror-charcoal">
              Buttons
            </CardTitle>
            <CardDescription className="text-horror-shadow">
              Interactive button variants with pastel horror styling
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button className="bg-horror-mint hover:bg-horror-glow text-horror-charcoal font-mono">
              Generate Vibe
            </Button>
            <Button
              variant="destructive"
              className="bg-horror-coral hover:bg-horror-rust text-horror-charcoal font-mono"
            >
              Stop Playback
            </Button>
            <Button
              variant="outline"
              className="border-horror-shadow text-horror-charcoal hover:bg-horror-peach/20 font-mono"
            >
              Reset Parameters
            </Button>
            <Button
              variant="secondary"
              className="bg-horror-lavender hover:bg-horror-lavender/80 text-horror-charcoal font-mono"
            >
              Save Settings
            </Button>
            <Button
              variant="ghost"
              className="hover:bg-horror-sage/30 text-horror-shadow font-mono"
            >
              More Options
            </Button>
          </CardContent>
        </Card>

        {/* Input Section */}
        <Card className="bg-horror-peach/30 border-horror-coral">
          <CardHeader>
            <CardTitle className="font-mono text-2xl text-horror-charcoal">
              Input
            </CardTitle>
            <CardDescription className="text-horror-shadow">
              Text input with pastel horror borders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter your vibe description..."
              className="border-horror-shadow bg-horror-peach/20 text-horror-charcoal placeholder:text-horror-shadow/60 focus:border-horror-coral font-sans"
            />
            <Input
              type="text"
              defaultValue="Slow tempo, dreamy synths"
              className="border-horror-sage bg-horror-mint/20 text-horror-charcoal font-sans"
            />
          </CardContent>
        </Card>

        {/* Card Variants Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-horror-lavender/30 border-horror-lavender">
            <CardHeader>
              <CardTitle className="font-mono text-horror-charcoal">
                DJ Effects
              </CardTitle>
              <CardDescription className="text-horror-shadow">
                Reverb, delay, and filters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-horror-charcoal font-sans text-sm">
                Apply professional audio effects to enhance your generated music.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-horror-sage/30 border-horror-sage">
            <CardHeader>
              <CardTitle className="font-mono text-horror-charcoal">
                Tempo Control
              </CardTitle>
              <CardDescription className="text-horror-shadow">
                BPM: 60-180
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-horror-charcoal font-sans text-sm">
                Adjust the speed and rhythm of your AI-generated tracks.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-horror-warning/30 border-horror-rust">
            <CardHeader>
              <CardTitle className="font-mono text-horror-charcoal">
                Volume Mix
              </CardTitle>
              <CardDescription className="text-horror-shadow">
                Balance instruments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-horror-charcoal font-sans text-sm">
                Fine-tune the mix of different audio elements.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Slider Section */}
        <Card className="bg-horror-slate/20 border-horror-slate">
          <CardHeader>
            <CardTitle className="font-mono text-2xl text-horror-charcoal">
              Slider
            </CardTitle>
            <CardDescription className="text-horror-shadow">
              Audio control sliders with pastel horror styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-mono text-sm text-horror-charcoal">
                  Volume
                </label>
                <span className="font-mono text-sm text-horror-shadow">
                  {sliderValue[0]}%
                </span>
              </div>
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-mono text-sm text-horror-charcoal">
                  Reverb Depth
                </label>
                <span className="font-mono text-sm text-horror-shadow">
                  75%
                </span>
              </div>
              <Slider
                defaultValue={[75]}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="font-mono text-sm text-horror-charcoal">
                  Filter Cutoff
                </label>
                <span className="font-mono text-sm text-horror-shadow">
                  25%
                </span>
              </div>
              <Slider
                defaultValue={[25]}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Progress Section */}
        <Card className="bg-horror-glow/20 border-horror-mint">
          <CardHeader>
            <CardTitle className="font-mono text-2xl text-horror-charcoal">
              Progress
            </CardTitle>
            <CardDescription className="text-horror-shadow">
              Loading and playback indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-mono text-sm text-horror-charcoal">
                  Generation Progress
                </span>
                <span className="font-mono text-sm text-horror-shadow">
                  {progressValue}%
                </span>
              </div>
              <Progress
                value={progressValue}
                className="bg-horror-slate/30"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-mono text-sm text-horror-charcoal">
                  Playback Position
                </span>
                <span className="font-mono text-sm text-horror-shadow">
                  33%
                </span>
              </div>
              <Progress
                value={33}
                className="bg-horror-peach/30"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-mono text-sm text-horror-charcoal">
                  Processing Audio
                </span>
                <span className="font-mono text-sm text-horror-shadow">
                  90%
                </span>
              </div>
              <Progress
                value={90}
                className="bg-horror-lavender/30"
              />
            </div>
          </CardContent>
        </Card>

        {/* Drawer Section */}
        <Card className="bg-horror-coral/20 border-horror-coral">
          <CardHeader>
            <CardTitle className="font-mono text-2xl text-horror-charcoal">
              Drawer
            </CardTitle>
            <CardDescription className="text-horror-shadow">
              DJ effects panel using Vaul drawer component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="bg-horror-mint hover:bg-horror-glow text-horror-charcoal font-mono">
                  Open DJ Effects Panel
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-horror-butter border-horror-shadow">
                <DrawerHeader className="border-b border-horror-slate/30">
                  <DrawerTitle className="font-mono text-2xl text-horror-charcoal">
                    DJ Effects Panel
                  </DrawerTitle>
                  <DrawerDescription className="text-horror-shadow font-sans">
                    Adjust professional audio effects in real-time
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="font-mono text-sm text-horror-charcoal mb-2 block">
                      Reverb Mix
                    </label>
                    <Slider defaultValue={[40]} max={100} step={1} />
                  </div>

                  <div>
                    <label className="font-mono text-sm text-horror-charcoal mb-2 block">
                      Delay Time
                    </label>
                    <Slider defaultValue={[60]} max={100} step={1} />
                  </div>

                  <div>
                    <label className="font-mono text-sm text-horror-charcoal mb-2 block">
                      Low-Pass Filter
                    </label>
                    <Slider defaultValue={[80]} max={100} step={1} />
                  </div>

                  <div className="bg-horror-mint/20 p-4 rounded-lg border border-horror-sage">
                    <p className="font-mono text-sm text-horror-charcoal">
                      Effects are applied in real-time during playback.
                    </p>
                  </div>
                </div>

                <DrawerFooter className="border-t border-horror-slate/30">
                  <Button className="bg-horror-mint hover:bg-horror-glow text-horror-charcoal font-mono">
                    Apply Effects
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="border-horror-shadow text-horror-charcoal hover:bg-horror-peach/20 font-mono"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
