import { Redis } from "ioredis";

const redisClient = new Redis();

redisClient.on("connect", () => {
  console.log("Redis connected");
});

async function demo() {
  await redisClient.set("mykey", "Hello World!");
}
demo();

export default redisClient;

// The environment variable in the file are not used due to some TCP error so server is connected through docker
// The redis server is running on docker container which contains the redis image and port mapped
