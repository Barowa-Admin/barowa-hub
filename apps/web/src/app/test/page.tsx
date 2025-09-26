'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function TestPage() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">shadcn/ui + Barowa Test</h1>
          <p className="text-muted-foreground">
            Teste hier die shadcn/ui Komponenten mit deinen Barowa-Farben
          </p>
        </div>

        {/* Button Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Button Komponenten</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Primary Button (G-Green)</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button (Royal Red)</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </CardContent>
        </Card>

        {/* Input Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Input Komponenten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Standard Input" />
            <Input placeholder="Disabled Input" disabled />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="E-Mail" type="email" />
              <Input placeholder="Passwort" type="password" />
            </div>
          </CardContent>
        </Card>

        {/* Card Variations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Barowa Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Deine digitale Grundausstattung für ein unabhängiges Leben im Internet.
              </p>
              <Button className="mt-4 w-full">Los geht's</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Deine Daten gehören dir. Keine Tracking, keine Überwachung.
              </p>
              <Button variant="secondary" className="mt-4 w-full">Mehr erfahren</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Open Source</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Transparenter Code, den du selbst hosten und anpassen kannst.
              </p>
              <Button variant="outline" className="mt-4 w-full">GitHub</Button>
            </CardContent>
          </Card>
        </div>

        {/* Color Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Farb-Palette (CSS Variables)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-primary rounded border"></div>
                <p className="text-sm">Primary (G-Green)</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-secondary rounded border"></div>
                <p className="text-sm">Secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-destructive rounded border"></div>
                <p className="text-sm">Destructive (Royal Red)</p>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-muted rounded border"></div>
                <p className="text-sm">Muted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Beispiel-Formular</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Vorname</label>
                <Input placeholder="Max" />
              </div>
              <div>
                <label className="text-sm font-medium">Nachname</label>
                <Input placeholder="Mustermann" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">E-Mail</label>
              <Input type="email" placeholder="max@example.com" />
            </div>
            <div className="flex gap-2">
              <Button>Speichern</Button>
              <Button variant="outline">Abbrechen</Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}
