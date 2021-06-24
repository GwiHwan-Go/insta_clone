#Instaclone

#Set up
mkdir -> mk git repository and add -> npm init -y -> code .
git config --global core.autocrlf true
npm install -g touch-for-windows --> touch RADME.md

npm i apollo-server graphql
package.json -> "scripts > dev " > npm run dev
npm i nodemon --save-dev

npm install --save-dev @babel/core
npm install @babel/preset-env --save-dev
touch babel.config.json 
"dev": "nodemon --exec babel-node server"
npm i @babel/node --save-dev

stack_builder => install postgres, pgadmin4, username should be same with .env, mydb should be changed
after open the pgadmin4, npx prisma migrate dev 

npx prisma studio

Instaclone Backend