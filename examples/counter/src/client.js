import babel from "babel-polyfill";
import {Mvc} from 'fishfront/react/react-mvc';
import Route from './config/route';
import Model from './config/model';

var mvc = new Mvc();
mvc.setRoute(Route);
mvc.setModel(Model);
mvc.render(location.href);