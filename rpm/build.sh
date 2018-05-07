export BASE_BUILD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export DIR_NAME=$(basename $BASE_BUILD_DIR)

rpmbuild --bb praise-request.spec