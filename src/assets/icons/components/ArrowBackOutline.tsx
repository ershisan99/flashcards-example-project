import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgArrowBackOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#arrow-back-outline_svg__a)'}>
      <path
        d={
          'M19 11H7.14l3.63-4.36a1.001 1.001 0 0 0-1.54-1.28l-5 6a1 1 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13q.039.078.09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .77-1.64L7.14 13H19a1 1 0 0 0 0-2'
        }
        fill={'currentcolor'}
      />
    </g>
    <defs>
      <clipPath id={'arrow-back-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgArrowBackOutline)
const Memo = memo(ForwardRef)

export default Memo
