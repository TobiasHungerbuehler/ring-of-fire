import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-134a1","appId":"1:345633066845:web:806b965cee54367c28a2b4","storageBucket":"ring-of-fire-134a1.appspot.com","apiKey":"AIzaSyCc3E352WY45mBhw6LeN_vrw8lrGNefoB8","authDomain":"ring-of-fire-134a1.firebaseapp.com","messagingSenderId":"345633066845"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
