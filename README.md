Documentation for Magento PWA Studio packages is located at [https://pwastudio.io](https://pwastudio.io).

# Getting Started
```
git clone git@github.com:fooman/pwa-frontend.git
cd pwa-frontend
cp .env.dist .env 
yarn install
yarn run buildpack create-custom-origin .
yarn watch
```

## Notes
This project uses https://www.npmjs.com/package/@fooman/venia-ui-override-resolver to customise files originating from node_modules/@magento/venia-ui and node_modules/@magento/peregrine and the override files can be found under src/overrides. A restart of the watch process is required if a new file is added.

Current master branch is automatically deployed to https://main-6254d28284e7.beta.pwa-serverless.com/.
Http access via
fooman
AUTHED_USER


#### CSS Break-points
list of the breakpoints to be used

```
@media (max-width: 1280px) {
@media (max-width: 480px) {
@media (max-width: 640px) {
@media (max-width: 960px) {
@media (min-width: 1024px) {
@media (min-width: 641px) {
@media only screen and (max-width: 768px) {
@media only screen and (min-width: 769px) {
@media only screen and (min-width: 641px) and (max-width: 1024px) {
```

