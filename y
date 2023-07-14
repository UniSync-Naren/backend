version = 0.1
[y.deploy.parameters]
stack_name = "unisync-backend"
resolve_s3 = true
s3_prefix = "unisync-backend"
region = "ap-southeast-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
disable_rollback = true
image_repositories = []
