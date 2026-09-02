import { Pie, PieChart, Cell } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChartData } from '@/types/Interfaces'

export const description = 'A donut chart'

// Paleta de colores empresarial
const COLORS = [
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

const chartConfig = {
  value: { label: 'Premios' },
} satisfies ChartConfig



export function ChartPieDonut({ empresa, data }: { empresa: string, data: ChartData[] }) {
  return (
    <Card className='flex flex-col w-full'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Grupo Empresarial {empresa}</CardTitle>
        <CardDescription>Premios Rango UVT</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <ChartContainer
              config={chartConfig}
              className='mx-auto aspect-square w-[250px] h-[250px]'
            >
              <PieChart width={250} height={250}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data as { label: string; value: number }[]}
                  dataKey='value'
                  nameKey='label'
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  stroke='#fff'
                  isAnimationActive
                  cx="50%"
                  cy="50%"
                >
                  {data.map((_entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          {/* Leyenda visual */}
          <div className="flex flex-col gap-3 text-sm flex-1">
            <h4 className="font-semibold text-gray-800 mb-2">Leyenda</h4>
            {data.map((item, idx) => (
              <div key={`legend-${idx}`} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shadow-sm border border-gray-200"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-700 text-xs leading-tight">
                    {item.label}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {item.value} premios
                  </p>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="font-bold text-gray-900">
                  {data.reduce((sum, item) => sum + item.value, 0)} premios
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
