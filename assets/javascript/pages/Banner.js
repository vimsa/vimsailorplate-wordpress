import Page from "../classes/Page";

export default class Banner extends Page {
   constructor() {
      super({
         id: 'banner',

         element: '.banner',
         elements: {
            section: '.section',
            wrapper: '.banner .wp-block-group__inner-container',
            navigation: document.querySelector('.navigation'),
         }
      })
   }
}