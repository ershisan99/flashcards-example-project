import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgColorPaletteOutline = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#color-palette-outline_svg__a)'} fill={'currentcolor'}>
      <path
        d={
          'M19.54 5.08A10.6 10.6 0 0 0 11.91 2a10 10 0 1 0-.05 20 2.58 2.58 0 0 0 2.53-1.89 2.52 2.52 0 0 0-.57-2.28.5.5 0 0 1 .37-.83h1.65A6.15 6.15 0 0 0 22 11.33a8.48 8.48 0 0 0-2.46-6.25M15.88 15h-1.65a2.49 2.49 0 0 0-1.87 4.15.49.49 0 0 1 .12.49c-.05.21-.28.34-.59.36a8 8 0 0 1-7.82-9.11A8.1 8.1 0 0 1 11.92 4H12a8.47 8.47 0 0 1 6.1 2.48 6.5 6.5 0 0 1 1.9 4.77A4.17 4.17 0 0 1 15.88 15'
        }
      />
      <path
        d={
          'M12 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M15.25 7.2a1.5 1.5 0 1 0 1.501 2.598A1.5 1.5 0 0 0 15.25 7.2M8.75 7.2a1.5 1.5 0 1 0-1.498 2.6A1.5 1.5 0 0 0 8.75 7.2M6.16 11.26a1.5 1.5 0 1 0 2.08.4 1.49 1.49 0 0 0-2.08-.4'
        }
      />
    </g>
    <defs>
      <clipPath id={'color-palette-outline_svg__a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgColorPaletteOutline)
const Memo = memo(ForwardRef)

export default Memo
