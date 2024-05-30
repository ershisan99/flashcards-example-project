import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgEmailOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#email-outline_svg__a)'}>
      <path
        d={
          'M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3m-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 1.2 0L20 7.25V17a1 1 0 0 1-1 1'
        }
        fill={'currentcolor'}
      />
    </g>
    <defs>
      <clipPath id={'email-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgEmailOutline)
const Memo = memo(ForwardRef)

export default Memo
