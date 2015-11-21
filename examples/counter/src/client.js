import babel from "babel-polyfill";
import Mvc from 'fishfront/react/react-mvc';
import Router from './config/router';

var mvc = new Mvc();
mvc.setRouter(Router);
mvc.render(location.href);