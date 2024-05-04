import { SeoProps } from '@/types'
import {Helmet} from 'react-helmet-async'


export default function Seo({title,description,name,type}:SeoProps) {
  return (
    <Helmet>
        {/* Standard metadata tags */}
        <title>{title}</title>
        <meta name="description" content={description}/>
        {/*End  Standard metadata tags */}
        {/* Facebook tags */}
        <meta property='og:type' content={type}/>
        <meta property='og:title' content={title}/>
        <meta property='og:description' content={description}/>
        {/* End Facebook tags */}
        {/* Twitter tags */}
        <meta name="twitter:creator" content={name}/>
        <meta name="twitter:card" content={type}/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        {/* End Twitter tags */}
    </Helmet>
  )
}
