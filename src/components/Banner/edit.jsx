
import './index.scss'
import { createContext, useContext } from "react"

import { PanelBody, Button, Icon, PanelRow } from "@wordpress/components"
import { InspectorControls, MediaUpload, RichText } from '@wordpress/block-editor'

const attributes = {
   slides: {
      type: 'array',
      default: [
         {
            title: "Lorem Ipsum 1",
            media: "https://source.unsplash.com/random"
         },
         {
            title: "Lorem Ipsum 2",
            media: "https://source.unsplash.com/random"
         },
         {
            title: "Lorem Ipsum 3",
            media: "https://source.unsplash.com/random"
         }
      ]
   }
}

const BannerContext = createContext(null)

const BannerEditPanel = () => {
   const { attributes, setAttributes } = useContext(BannerContext)

   return (
      <InspectorControls>
         <PanelBody title="Banner Slider">
            <PanelRow>
               <Button isPrimary={true}
                  onClick={() => {
                     const slidesCopy = [...attributes.slides]
                     slidesCopy.push({
                        media: {
                           url: "https://source.unsplash.com/random",
                           type: 'image',
                        },
                        text: 'EMBRACE THE SPIRIT OF ST.BARTHS',
                     })

                     setAttributes({ slides: slidesCopy })
                  }}
               >
                  Add new slide
               </Button>
            </PanelRow>
         </PanelBody>
      </InspectorControls>
   )
}

const BannerEdit = ({ attributes, setAttributes }) => {
   return (
      <div className="section__banner">
         <HeroContext.Provider value={{
            attributes, setAttributes
         }}>
            <HeroEditPanel />
         </HeroContext.Provider>
         <div className="banner__slides">
            {attributes.slides.map((slide, index) => (
               <div className="slide">
                  <MediaUpload
                     allowedTypes={['image', 'video']}
                     onSelect={(media) => {
                        const slidesCopy = [...attributes.slides]
                        slidesCopy[index].media = media

                        console.log(slidesCopy)

                        setAttributes({ slides: slidesCopy })
                     }}
                     render={({ open }) => (
                        <div className="wp-action__floating">
                           <Button isPrimary={true} onClick={open}>
                              <Icon icon="camera" />
                           </Button>

                           <Button isPrimary={true} isDestructive={true}
                              onClick={() => {
                                 const slidesCopy = [...attributes.slides]
                                 slidesCopy.splice(index, 1)

                                 setAttributes({ slides: slidesCopy })
                              }}
                           >
                              <Icon icon="trash" />
                           </Button>
                        </div>
                     )}
                  />

                  <div className="background__image"
                     style={{
                        backgroundImage: `url("${slide.media.url}")`,
                     }}
                  />

                  <RichText tagName="h1" value={slide.text}
                     onChange={(text) => {
                        const slidesCopy = [...attributes.slides]
                        slidesCopy[index].text = text

                        setAttributes({ slides: slidesCopy })
                     }}
                  />
               </div>
            ))}
         </div>

         <a href="#" className="banner__navigation banner__navigation__prev">
            Prev

            <div className="banner__navigation__icon" />
         </a>

         <a href="#" className="banner__navigation banner__navigation__next">
            <div className="banner__navigation__icon" />
            Next
         </a>

         <div className="banner__pagination">
            {attributes.slides.map((slide, index) => (
               <a href="#" className="active">
                  {(index + 1).toString().padStart(2, '0')}
               </a>
            ))}

            {/*<a href="#">*/}
            {/*    <img src={pagination} alt=""/>*/}
            {/*</a>*/}
         </div>
      </div>
   )
}

export default BannerEdit
export {
   attributes
}