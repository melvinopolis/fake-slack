import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
//components
import MessageList from './components/MessageList';
//styles
require('./styles/main.scss');


//add fonts
let fonts = document.createElement('link')
fonts.rel = "stylesheet"
fonts.href = "https://fonts.googleapis.com/css?family=Lato:400,300,900"
let icons = document.createElement('link')
icons.rel= "stylesheet"
icons.href = "https://fonts.googleapis.com/icon?family=Material+Icons"

let head = document.querySelector('head')
head.appendChild(fonts)
head.appendChild(icons)

let title = document.querySelector('title')
title.innerText = 'sl;ck'

var loadPoint = document.querySelector('#app');
ReactDOM.render(<MessageList />, loadPoint);