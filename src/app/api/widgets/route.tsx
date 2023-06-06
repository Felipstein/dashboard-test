import { Widget } from '@/@types/widget'
import { prisma } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { key, dashboardId, layout } = (await req.json()) as Omit<Widget, 'id'>

  const widget = await prisma.widget.create({
    data: {
      key,
      dashboardId,
      // @ts-ignore
      layout,
    },
  })

  return NextResponse.json(widget)
}
