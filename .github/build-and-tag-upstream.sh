#!/bin/bash
echo "$1"
pwd
source $GITHUB_WORKSPACE/.github/tags-to-build
if git rev-parse $1 >/dev/null 2>&1
then
    echo "Found tag"
else
	echo "COMMIT to USE" ${!1}
    cd $GITHUB_WORKSPACE
    git checkout $COMMIT_SHA
    cd $GITHUB_WORKSPACE/packages/pwa-buildpack && npm install
    DEBUG_PROJECT_CREATION=true $GITHUB_WORKSPACE/packages/pwa-buildpack/bin/buildpack create-project $GITHUB_WORKSPACE/../$1-to-delete --template "venia-concept" --name "pwa-studio" --author "Test Author<user@example.com>" --backend-url "https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/" --braintree-token "sandbox_8yrzsvtm_s2bg8fs563crhqzk" --npm-client "yarn" --install 0
    cp $GITHUB_WORKSPACE/../$TAG-to-delete/package.json > $GITHUB_WORKSPACE/output/packages/pwa-create/package-$1.json
    cat $GITHUB_WORKSPACE/output/packages/pwa-create/package-$1.json
fi