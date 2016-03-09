# graphql-server

GraphQL server with Mongoose (MongoDB) and Node.js

For use with Universe's MongoDB as a read-only database.

## Like this? Check out our GraphQL ORM: [graffiti](https://github.com/RisingStack/graffiti)

## Installation

You need `iojs` or >= `Node.js` v0.12.x

Tested with NodeJS 4.2 (it's what we use internally at Universe for other projects).

```
npm install
```

## Usage

### Starting the server

```
npm start
PORT=2323 npm start
```

### Starting the client to test the server

```
npm run client
PORT=2323 npm run client
```

### Examples

#### Example GraphQL query

```
user(id: "1") {
  name
  friends {
    name
  }
}
```

#### Example response

```json
{
  "data": {
    "user": {
      "name": "John Doe",
      "friends": [
        {
          "name": "Friend One"
        },
        {
          "name": "Friend Two"
        }]
      }
    }
  }
```

#### Example GraphQL mutation

```
mutation updateUser($userId: String! $name: String!) {
  updateUser(id: $userId name: $name) {
    name
  }
}
```
