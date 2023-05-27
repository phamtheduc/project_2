*NOTE: I am using typeorm (
  not pg-promise as tutorial: so I do not have the sql file in migrations,
  but I have the ts file and in it I am able to modify database as in the sql file of pg-promise
)

Setting project:
1. create a postgres local
name: postgres, username:postgres, password: binh
2. create .env file and put all enviroment variable to it
3. Running: 'yarn migration:run' to creation DB which then connects to the project
*yarn migration:run     like the sql.up file in pg-promise
*yarn migration:revert  like the sql.down file in pg-peomise
*I was create all 3 table User, Product, Order in a file ts in migrations folder
3. yarn install
4. yarn dev

#Environment variable

PORT=3000
BCRYPT_PASSWORD=secret-password
SALT_ROUND=10
JWT_SECRET=secret-token
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=binh
DB_DATABASE_DEV=postgres
DB_DATABASE_TEST=fantasy_worlds
ENV=dev