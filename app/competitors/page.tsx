"use client"

import { competitorReels } from "@/lib/data/competitors"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricBar } from "@/components/charts/metric-bar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CompetitorsPage() {
  const router = useRouter()
  const totals = competitorReels.reduce(
    (acc, r) => {
      acc.likes += r.likes
      acc.views += r.views
      acc.shares += r.shares
      return acc
    },
    { likes: 0, views: 0, shares: 0 },
  )

  const chart = [
    { name: "Likes", value: totals.likes },
    { name: "Views", value: totals.views },
    { name: "Shares", value: totals.shares },
  ]

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <Button variant="ghost" size="sm" aria-label="Go back" onClick={() => router.back()} className="mb-2">
          <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        <h1 className="text-balance text-2xl font-semibold">Competitor Dashboard</h1>
        <p className="text-sm text-muted-foreground">Track competitor reel performance.</p>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Likes" value={totals.likes.toLocaleString()} />
        <StatCard label="Total Views" value={totals.views.toLocaleString()} />
        <StatCard label="Total Shares" value={totals.shares.toLocaleString()} />
      </section>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Aggregate Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <MetricBar data={chart} />
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2">
        {competitorReels.map((r) => (
          <Card key={r.id} className="overflow-hidden">
            <div className="grid grid-cols-[140px_1fr] gap-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.thumbnailUrl || "/placeholder.svg"} alt={r.title} className="h-full w-full object-cover" />
              <div className="p-4">
                <h3 className="text-base font-semibold">{r.title}</h3>
                <p className="text-xs text-muted-foreground">by {r.creator}</p>
                <Separator className="my-3" />
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <Metric label="Likes" value={r.likes} />
                  <Metric label="Views" value={r.views} />
                  <Metric label="Shares" value={r.shares} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border p-2 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value.toLocaleString()}</p>
    </div>
  )
}
