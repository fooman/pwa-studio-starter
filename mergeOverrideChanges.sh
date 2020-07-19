#!/usr/bin/env bash

download_diff () {
    week_start=$1
    week_end=$2
    url="https://github.com/fooman/pwa-studio-canary/compare/fooman-canary-2020-${week_start}...fooman-canary-2020-${week_end}.patch"
    echo "download patch from ${url}"
    curl ${url} -o current.patch
}

adjust_patch_to_override_folder () {
    gsed -i 's#packages/venia-ui/lib#src/overrides/venia-ui#g' current.patch
    gsed -i 's#packages/peregrine/lib#src/overrides/peregrine#g' current.patch
}

confirm_all_overrides_valid () {
    find ./src/overrides/venia-ui -not -name "*.patch" -type f -print0 | while read -d $'\0' file
    do
        fileToCheck=$(echo "$file" | gsed "s#src/overrides/venia-ui#node_modules/@magento/venia-ui/lib#g")
        if [ ! -f $fileToCheck ]; then
            echo "$file is not an override"
            exit 1
        else
            git --no-pager diff --no-index --patch $fileToCheck $file  > $file-our-orig-changes.patch
        fi
    done
    find ./src/overrides/peregrine -not -name "*.patch" -type f -print0 | while read -d $'\0' file
    do
        fileToCheck=$(echo "$file" | gsed "s#src/overrides/peregrine#node_modules/@magento/peregrine/lib#g")
        if [ ! -f $fileToCheck ]; then
            echo "$file is not an override"
            exit 1
        else
            git --no-pager diff --no-index --patch $fileToCheck $file  > $file-our-orig-changes.patch
        fi
done
}

confirm_all_overrides_valid
download_diff $1 $2
adjust_patch_to_override_folder

find ./src/overrides -type f -print0 | while read -d $'\0' file
do
    fileToPatch=`echo $file | cut -c3-`
    fileChanges=`filterdiff -p1 -i $fileToPatch current.patch`
    if [ "$fileChanges" != '' ]; then
        echo "$fileToPatch"
        filterdiff -p1 -i $fileToPatch current.patch > $file.patch
        # TODO patch directly
    fi
done


