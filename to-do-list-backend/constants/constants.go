package constants

import helpers "to-do-list/helpers/secrets"

var SECRET_JWT_KEY, _ = helpers.LoadSecrets(".env", "SECRETJTW")