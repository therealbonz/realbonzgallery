import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import Gallery from '../components/Gallery';
import ImageUpload from '../components/ImageUpload';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Gallery,
  ImageUpload,
});
