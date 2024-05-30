import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgTrendingUp = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#trending-up_svg__a)'}>
      <path
        d={
          'M21 7q.015-.105 0-.21a.6.6 0 0 0-.05-.17 1 1 0 0 0-.09-.14.8.8 0 0 0-.14-.17l-.12-.07a.7.7 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 1 0 0 2h2.83l-4 4.71-4.32-2.57a1 1 0 0 0-1.28.22l-5 6A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34 4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0z'
        }
        fill={'currentcolor'}
      />
    </g>
    <defs>
      <clipPath id={'trending-up_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgTrendingUp)
const Memo = memo(ForwardRef)

export default Memo
