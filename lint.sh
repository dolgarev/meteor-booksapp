#/bin/bash
CMD="meteor npm run lint:fix --silent"

# [https://github.com/npm/npm/issues/6124]
echo "> Start linting"
echo ""
echo $CMD
eval $CMD
echo ""
echo "> Complete linting"
