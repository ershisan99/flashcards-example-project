import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" ref={ref} {...props}>
    <circle cx={16} cy={16} r={15.5} fill="gray" stroke="#fff" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M16 18.84a2.49 2.49 0 1 0 0-4.97 2.49 2.49 0 0 0 0 4.97Zm0-.62a1.87 1.87 0 1 0 0-3.73 1.87 1.87 0 0 0 0 3.73Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M19 11.38a3.86 3.86 0 0 0-3.02-1.25c-1.59 0-2.28.56-3.02 1.25H10.4c-1.03 0-1.87.83-1.87 1.86v6.23c0 1.03.84 1.86 1.87 1.86h11.2c1.03 0 1.87-.83 1.87-1.86v-6.23c0-1.03-.84-1.86-1.87-1.86H19Zm-.25.62-.06-.06-.18-.17a5.4 5.4 0 0 0-.67-.53 3.15 3.15 0 0 0-1.86-.48c-.92 0-1.44.2-1.87.48a5.4 5.4 0 0 0-.66.53l-.18.17-.07.06h-2.8c-.69 0-1.24.56-1.24 1.24v6.23c0 .68.55 1.24 1.24 1.24h11.2c.69 0 1.24-.56 1.24-1.24v-6.23c0-.68-.55-1.24-1.24-1.24h-2.85Z"
      clipRule="evenodd"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)
