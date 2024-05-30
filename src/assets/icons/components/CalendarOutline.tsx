import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgCalendarOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#calendar-outline_svg__a)'} fill={'currentcolor'}>
      <path
        d={
          'M18 4h-1V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3M6 6h1v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h1a1 1 0 0 1 1 1v4H5V7a1 1 0 0 1 1-1m12 14H6a1 1 0 0 1-1-1v-6h14v6a1 1 0 0 1-1 1'
        }
      />
      <path d={'M8 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2M16 15h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2'} />
    </g>
    <defs>
      <clipPath id={'calendar-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgCalendarOutline)
const Memo = memo(ForwardRef)

export default Memo
