import { prisma } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

  const dashboard = await prisma.dashboard.create({
    data: { name: data.name },
  })

  return NextResponse.json(dashboard, { status: 201 })
}
