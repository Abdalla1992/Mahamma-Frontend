// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   mahammaApiBaseUrl: 'https://localhost:44388/api/',
  //mahammaApiBaseUrl: 'http://mahammaapi.mahamma.com/api/',
   mahammaIdentityApiBaseUrl: 'https://localhost:44353/api/',
  //mahammaIdentityApiBaseUrl: 'http://mahammaidentityapi.mahamma.com/api/',
   mahammaDocumentApiBaseUrl: 'https://localhost:44355/api/',
  //mahammaDocumentApiBaseUrl: 'http://mahammadocumentapi.mahamma.com/api/',
   mahammaNotificationBaseUrl: 'https://localhost:44337',
  //mahammaNotificationBaseUrl: 'http://mahammanotificationapi.mahamma.com',
  googleClientId:
    '1044195431119-vtfgd6ecet4osrsqsbp0t7n4oavduubf.apps.googleusercontent.com',
  firebase: {
      apiKey: "AIzaSyA395JXk_lp0T-vF3zNHEDZlA_13e5u5Gk",
      authDomain: "digitalbear.firebaseapp.com",
      projectId: "digitalbear",
      storageBucket: "digitalbear.appspot.com",
      messagingSenderId: "1044195431119",
      appId: "1:1044195431119:web:26f97d4212584489499dba",
      measurementId: "G-Y1DW1P4JL2",
      vapidKey: "BLuHG7n9t41KWq_o9sTLWdl9TmnJRL-FyGR3daNpcxeHejWzmQZXA8BMh1BwZQDARmXicyF9e2yZfwNUsUEWuHA"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
