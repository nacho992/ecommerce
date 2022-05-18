

## Ecommerce-cart Features
This app simulates a shopping cart. [FireBase](https://firebase.google.com/docs?gclid=Cj0KCQjwspKUBhCvARIsAB2IYusQS1MBCNhUWRItEMTwcHDRnHRW7zXc_2zgXWtYOpSd9PEnvz8cFd4aArz_EALw_wcB&gclsrc=aw.ds) is used to bring the data and to be able to save the orders of the users. When adding or removing products from the cart, they will be displayed in a table which uses the [agGrid](https://www.ag-grid.com/angular-data-grid/) library.

The name and price columns can be sorted. The quantity of products can be modified.

Firebase is also used for authentication and the authentication status is handled with [NgRx](https://ngrx.io/docs).

The forms for authentication were implemented in the [Fromly](https://formly.dev/) library. 
for the styles the [material](https://material.angular.io/) library and scss were used