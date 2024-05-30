import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgPaid = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M11.365.521a1 1 0 0 1 1.27 0l2.14 1.758a1 1 0 0 0 .694.225l2.765-.164a1 1 0 0 1 1.026.746l.699 2.68a1 1 0 0 0 .429.59L22.72 7.85a1 1 0 0 1 .392 1.207l-1.01 2.58a1 1 0 0 0 0 .729l1.01 2.579a1 1 0 0 1-.392 1.207l-2.333 1.492a1 1 0 0 0-.429.59l-.698 2.68a1 1 0 0 1-1.027.747l-2.765-.164a1 1 0 0 0-.694.225l-2.14 1.758a1 1 0 0 1-1.27 0l-2.14-1.758a1 1 0 0 0-.694-.225l-2.765.164a1 1 0 0 1-1.027-.746l-.698-2.68a1 1 0 0 0-.429-.59L1.28 16.15a1 1 0 0 1-.392-1.207l1.01-2.58a1 1 0 0 0 0-.729L.887 9.056a1 1 0 0 1 .392-1.207l2.333-1.492a1 1 0 0 0 .429-.59l.698-2.68a1 1 0 0 1 1.027-.747l2.765.164a1 1 0 0 0 .694-.225z'
      }
      fill={'#397DF6'}
    />
    <g clipPath={'url(#Paid_svg__a)'} fill={'#fff'}>
      <path
        d={
          'M15.08 8.14a.667.667 0 0 0-.94.113l-4.667 6-2.286-2.786a.668.668 0 1 0-1.04.833l2.78 3.453a.67.67 0 0 0 .52.247.67.67 0 0 0 .553-.253l5.22-6.667a.667.667 0 0 0-.14-.94M18.413 8.14a.666.666 0 0 0-.94.113l-4.666 6-.407-.5-.84 1.08.733.914a.67.67 0 0 0 1.04-.007l5.22-6.667a.666.666 0 0 0-.14-.933'
        }
      />
      <path d={'m9.807 12.707.86-1.08-.134-.16a.664.664 0 1 0-1.053.806z'} />
    </g>
    <defs>
      <clipPath id={'Paid_svg__a'}>
        <path d={'M4 4h16v16H4z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgPaid)
const Memo = memo(ForwardRef)

export default Memo
