import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={20}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      clipRule={'evenodd'}
      d={
        'M12 4.5C7 4.5 2.73 7.6 1 12a11.83 11.83 0 0 0 22 0c-1.73-4.39-6-7.5-11-7.5zM12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'
      }
      fill={'#fff'}
      fillRule={'evenodd'}
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)
