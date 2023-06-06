import { prisma } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const dashboard = await prisma.dashboard.findUnique({
    where: { id: params.id },
    select: { id: true, name: true, Widget: true },
  })

  return NextResponse.json(dashboard)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await prisma.dashboard.delete({ where: { id: params.id } })

  return NextResponse.json({ deleted: true })
}
