declare module '*.jsx' {
  import { FC, SVGProps } from 'react'
  
  const Component: FC<SVGProps<SVGSVGElement>>
  export default Component
}

declare module '../components/NewsletterIllustration' {
  import { FC, SVGProps } from 'react'
  
  const NewsletterIllustration: FC<SVGProps<SVGSVGElement>>
  export default NewsletterIllustration
}

declare module '../components/HeroShoppingIllustration' {
  import { FC, SVGProps } from 'react'
  
  const HeroShoppingIllustration: FC<SVGProps<SVGSVGElement>>
  export default HeroShoppingIllustration
}

declare module '../components/icons/*' {
  import { FC, SVGProps } from 'react'
  
  const Icon: FC<SVGProps<SVGSVGElement>>
  export default Icon
}

declare module '../components/products/*' {
  import { FC, SVGProps } from 'react'
  
  const ProductSVG: FC<SVGProps<SVGSVGElement>>
  export default ProductSVG
}
