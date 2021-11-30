import "../style/index.scss"
import Page from './classes/Page'

class App {
   constructor() {
      this.createPage()
   }

   createPage() {
      this.page = new Page()
      console.log(this.page);
   }
}

new App()