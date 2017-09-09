#! /bin/bash

version() {
    git_branch=`git rev-parse --abbrev-ref HEAD`
    # Replace any periods with dashes to make a valid VERSION ID
    VERSION=${git_branch/./-}
    # Replace any underscores with dashes to make a valid VERSION ID
    VERSION=${VERSION/_/-}
    # Strip the branch type from the branch name
    VERSION=${VERSION/release\//}
    VERSION=${VERSION/feature\//}
    VERSION=${VERSION/task\//}
    VERSION=${VERSION/hotfix\//}
    VERSION=${VERSION/fix\//}
    # To lowercase
    VERSION=`echo "${VERSION}" | tr A-Z a-z`
    echo $VERSION
}

version