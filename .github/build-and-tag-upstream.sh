#!/bin/bash
TAG=$1
echo "$TAG"
SHA_LOOKUP=${1//[.]/_}
echo "$SHA_LOOKUP"
source $GITHUB_WORKSPACE/.github/tags-to-build
if git rev-parse $1 >/dev/null 2>&1
then
    echo "Found tag"
else
    echo "Retrieve PWA-Studio"
    git clone https://github.com/magento/pwa-studio.git $GITHUB_WORKSPACE/../pwa-studio-$TAG

	echo "COMMIT to USE" ${!SHA_LOOKUP}
    cd $GITHUB_WORKSPACE/../pwa-studio-$TAG && git checkout ${!SHA_LOOKUP}

    echo "NPM Install"
    cd $GITHUB_WORKSPACE/../pwa-studio-$TAG/packages/pwa-buildpack && npm install
    
    echo "create packages"
    cd $GITHUB_WORKSPACE/../pwa-studio-$TAG && DEBUG_PROJECT_CREATION=true ./packages/pwa-buildpack/bin/buildpack create-project ../$TAG-to-delete --template "venia-concept" --name "pwa-studio-canary" --author "Test Author<user@example.com>" --backend-url "https://master-7rqtwti-mfwmkrjfqvbjk.us-4.magentosite.cloud/" --braintree-token "sandbox_8yrzsvtm_s2bg8fs563crhqzk" --npm-client "yarn" --install 0
    
    echo "remove local resolutions"

    mv $GITHUB_WORKSPACE/../$TAG-to-delete/package.json $GITHUB_WORKSPACE/../$TAG-to-delete/package-tmp.json
	cat $GITHUB_WORKSPACE/../$TAG-to-delete/package-tmp.json | jq 'del(.resolutions)' > $GITHUB_WORKSPACE/../$TAG-to-delete/package.json
	cat $GITHUB_WORKSPACE/../$TAG-to-delete/package.json
    export MY_PATH=$(readlink -f $GITHUB_WORKSPACE/../pwa-studio-$TAG/packages) && sed -i -e "s#file://$MY_PATH/[^0-9]*##g" $GITHUB_WORKSPACE/../$TAG-to-delete/package.json && sed -i -e "s#\.tgz##g" $GITHUB_WORKSPACE/../$TAG-to-delete/package.json
    echo "Update code"

    cd $GITHUB_WORKSPACE
    find . | grep -v ".git" | grep -v "^\.*$" | xargs rm -rf
    cp -r $GITHUB_WORKSPACE/../$TAG-to-delete/. .
    rm $GITHUB_WORKSPACE/yarn.lock
    git diff $GITHUB_WORKSPACE/package.json
	git status
fi