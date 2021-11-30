import './assets/styles/index.scss';

import { registerBlockType } from "@wordpress/blocks";
import BannerEdit, {
   attributes as bannerAttr
} from "./components/Banner/edit";
import BannerSave from "./components/Banner/save";

registerBlockType('vimsa/banner', {
   apiVersion: 2,
   title: 'Banner',
   icon: 'universal-access-alt',
   category: 'design',
   edit: BannerEdit,
   save: BannerSave,
   attributes: bannerAttr,
})