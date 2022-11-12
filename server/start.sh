set -o allexport
source ../database.env
set +o allexport
export MYSQL_HOST=localhost
export MYSQL_PORT=6033
npm install --no-optional --no-audit --no-fund --omit=optional
npm run dev