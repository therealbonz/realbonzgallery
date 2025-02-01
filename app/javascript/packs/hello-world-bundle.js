import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';
import Gallery from '../components/Gallery';
import ImageUpload from '../components/ImageUpload';
import NavBar from '../components/NavBar';
import Login from '../components/Login'
import App from '../components/App'
import SignUp from '../components/SignUp'
import Profile from '../components/Profile'




// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Gallery,
  ImageUpload,
  NavBar,
  Login,
  App,
  SignUp,
  Profile,
});
