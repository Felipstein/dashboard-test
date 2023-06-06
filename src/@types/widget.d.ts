import { Widget as WidgetPrisma } from '@prisma/client'
import { Layout } from 'react-grid-layout'

export interface Widget extends Omit<WidgetPrisma, 'layout'> {
  layout: Layout
}
