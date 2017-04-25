import React from 'react';
import ReactDOM from 'react-dom';
import MainContent from './MainContent';
import './index.css';

// CSS Libs
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap

import 'font-awesome/css/font-awesome.min.css'; // Font-awesome

import 'admin-lte/dist/css/AdminLTE.min.css'; // AdminLTE
import 'admin-lte/dist/css/skins/_all-skins.min.css'; // Skins AdminLTE

// JS Libs
import $ from 'jquery'; // jQuery
window.jQuery = window.$ = $;

require('bootstrap') // Bootstrap

// AdminLTE
require('admin-lte');
require('admin-lte/plugins/slimScroll/jquery.slimscroll.min.js');

ReactDOM.render(
  <MainContent />,
  document.getElementById('root')
);
