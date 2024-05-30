import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgArrowIosDownOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#arrow-ios-Down-outline_svg__a)'}>
      <path
        d={
          'M5.514 9.458a1 1 0 0 1 1.64-.77l5.36 4.48 5.37-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.15 1.46l-6 4.83a1 1 0 0 1-1.27 0l-6-5a1 1 0 0 1-.36-.83'
        }
        fill={'currentcolor'}
      />
    </g>
    <defs>
      <clipPath id={'arrow-ios-Down-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgArrowIosDownOutline)
const Memo = memo(ForwardRef)

export default Memo
