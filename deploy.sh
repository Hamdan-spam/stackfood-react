git pull
yarn run build
pm2 delete "stackfood-next-js"
pm2 start npm --name "stackfood-next-js" -- start
