import EventEmitter from 'events'
import locomotiveScroll from 'locomotive-scroll'

export default class Page extends EventEmitter {
   constructor({ element, elements }) {
      super()

      this.scroller = new locomotiveScroll({
         el: document.querySelector('main__content'),
         smooth: !0,
         offset: [-100, -100],
         reloadOnContextChange: true,
         tablet: {
            lerp: 0.3,
            smooth: true
         },
         smartphone: {
            lerp: 0.3,
            smooth: true
         }
      })

      this.selectors = {
         element,
         elements
      }

      console.log(this.scroller, this.selectors);
   }
}