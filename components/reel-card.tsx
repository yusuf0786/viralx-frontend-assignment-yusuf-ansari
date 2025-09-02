"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

type Props = {
  title: string
  niche: string
  thumbnailUrl: string
}

export function ReelCard({ title, niche, thumbnailUrl }: Props) {
  return (
    <Card className="overflow-hidden border bg-background">
      <CardContent className="p-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title}
          className="h-[420px] w-full object-cover sm:h-[400px] md:h-[500px]"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3 p-2 sm:p-4">
        <div className="min-w-0">
          <h3 className="font-semibold leading-6 text-balance text-sm sm:text-base">{title}</h3>
          <p className="sr-only">Niche</p>
        </div>
        <Badge className="whitespace-nowrap" variant="secondary" aria-label={`Niche ${niche}`}>
          {niche}
        </Badge>
      </CardFooter>
    </Card>
  )
}
