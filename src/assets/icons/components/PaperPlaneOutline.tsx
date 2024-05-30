import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgPaperPlaneOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#paper-plane-outline_svg__a)'}>
      <path
        d={
          'M21 4a1.3 1.3 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.9.9 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18q.033-.133.03-.27m-4.7 2.29-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z'
        }
        fill={'currentcolor'}
      />
    </g>
    <defs>
      <clipPath id={'paper-plane-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgPaperPlaneOutline)
const Memo = memo(ForwardRef)

export default Memo
