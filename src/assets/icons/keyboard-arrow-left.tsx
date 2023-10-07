import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_5928_3055)">
      <path
        d="M10.2733 11.06L7.21998 8L10.2733 4.94L9.33331 4L5.33331 8L9.33331 12L10.2733 11.06Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_5928_3055">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)
