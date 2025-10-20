import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AddRide } from './components/add-ride/add-ride';
import { Login } from './components/login/login';
import { PickRide } from './components/pick-ride/pick-ride';
import { Home } from './components/home/home';

export const routes: Routes = [{
    path: '', component: Login
},
{
    path:'home', component: Home
},
{
    path: 'addNewRide', component: AddRide
},
{
    path: 'rides', component: PickRide
}

];
