## Getting Started

First, run the development server:

```bash
npm run dev
```

## Create table

### setup mysql

https://orm.drizzle.team/docs/guides/mysql-local-setup
https://medium.com/@aslandjc7/next-js-15-drizzle-orm-a-beginners-guide-to-crud-operations-ae7f2701a8c3

```bash
docker run --name drizzle-mysql -e MYSQL_ROOT_PASSWORD=root -d -p 3307:3306 mysql
```

```sql
create database survey;
```

Applying changes to the database

```
npx drizzle-kit push
```

Generate migration

```
npx drizzle-kit generate
```

Apply migration

```
npx drizzle-kit migrate
```
