Instructions for QA Team:

1. Clone repo
2. NPM install
3. NPM start
4. In opened window, go to app on staging
5. Supplies should now fetch products from us store
6. Checking out eu store, would require to change auth.us to auth.eu on line 30 in intercept.js. But to check how it would behave on production,
we would also need to change region in local storage to eu, but this causes some problems in this environment.
