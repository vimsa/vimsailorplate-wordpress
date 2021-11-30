import './index.scss'

const BannerSave = () => {
   return (
      <div className="section__banner banner">
         <div className="banner__wrapper">
            <div className="banner__slider">
               <div className="background__image" style={{
                  backgroundImage: `url("https://source.unsplash.com/random")`,
               }} />
               <h1 className="banner__title">
                  Banner Title
               </h1>
            </div>
            <a href="#" className="hero-navigation hero-navigation__prev">
               Prev

               <div className="hero-navigation hero-navigation__line" />
            </a>

            <a href="#" className="hero-navigation hero-navigation__next">
               <div className="hero-navigation__line" />
               Next
            </a>
         </div>
      </div>
   )
}
export default BannerSave