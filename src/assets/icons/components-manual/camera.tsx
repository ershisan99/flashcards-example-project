import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'44'}
    ref={ref}
    viewBox={'0 0 44 44'}
    width={'44'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g filter={'url(#filter0_d_5918_2450)'}>
      <rect fill={'#4C4C4C'} height={'24'} rx={'4'} width={'24'} x={'10'} y={'8'} />
      <g clipPath={'url(#clip0_5918_2450)'}>
        <path
          d={
            'M26.6666 25.3334H17.3333C17.1565 25.3334 16.9869 25.4036 16.8619 25.5286C16.7369 25.6537 16.6666 25.8232 16.6666 26C16.6666 26.1769 16.7369 26.3464 16.8619 26.4714C16.9869 26.5965 17.1565 26.6667 17.3333 26.6667H26.6666C26.8434 26.6667 27.013 26.5965 27.138 26.4714C27.2631 26.3464 27.3333 26.1769 27.3333 26C27.3333 25.8232 27.2631 25.6537 27.138 25.5286C27.013 25.4036 26.8434 25.3334 26.6666 25.3334Z'
          }
          fill={'white'}
        />
        <path
          d={
            'M17.3333 24H17.3933L20.1733 23.7467C20.4778 23.7163 20.7626 23.5821 20.98 23.3667L26.98 17.3667C27.2128 17.1206 27.3387 16.7923 27.3299 16.4537C27.3212 16.115 27.1786 15.7937 26.9333 15.56L25.1066 13.7333C24.8682 13.5094 24.5558 13.3809 24.2288 13.3723C23.9019 13.3637 23.5831 13.4756 23.3333 13.6867L17.3333 19.6867C17.1178 19.904 16.9836 20.1888 16.9533 20.4933L16.6666 23.2733C16.6576 23.371 16.6703 23.4694 16.7037 23.5616C16.7371 23.6538 16.7905 23.7374 16.86 23.8067C16.9222 23.8684 16.9961 23.9173 17.0773 23.9505C17.1586 23.9837 17.2455 24.0005 17.3333 24ZM24.18 14.6667L26 16.4867L24.6666 17.7867L22.88 16L24.18 14.6667ZM18.2466 20.6067L22 16.88L23.8 18.68L20.0666 22.4133L18.0666 22.6L18.2466 20.6067Z'
          }
          fill={'white'}
        />
      </g>
    </g>
    <defs>
      <filter
        colorInterpolationFilters={'sRGB'}
        filterUnits={'userSpaceOnUse'}
        height={'44'}
        id={'filter0_d_5918_2450'}
        width={'44'}
        x={'0'}
        y={'0'}
      >
        <feFlood floodOpacity={'0'} result={'BackgroundImageFix'} />
        <feColorMatrix
          in={'SourceAlpha'}
          result={'hardAlpha'}
          type={'matrix'}
          values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
        />
        <feOffset dy={'2'} />
        <feGaussianBlur stdDeviation={'5'} />
        <feColorMatrix
          type={'matrix'}
          values={'0 0 0 0 0.429167 0 0 0 0 0.429167 0 0 0 0 0.429167 0 0 0 0.25 0'}
        />
        <feBlend
          in2={'BackgroundImageFix'}
          mode={'normal'}
          result={'effect1_dropShadow_5918_2450'}
        />
        <feBlend
          in={'SourceGraphic'}
          in2={'effect1_dropShadow_5918_2450'}
          mode={'normal'}
          result={'shape'}
        />
      </filter>
      <clipPath id={'clip0_5918_2450'}>
        <rect fill={'white'} height={'16'} transform={'translate(14 12)'} width={'16'} />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export default memo(ForwardRef)
