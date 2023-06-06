import { prisma } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await prisma.widget.delete({ where: { id: params.id } })

  return NextResponse.json({ deleted: true })
}
