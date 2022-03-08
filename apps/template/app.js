import {
  createAppServer,
  asyncJsonHandler as handler,
  SimpleUsersDao,
} from "@stanlemon/server-with-auth";

const users = new SimpleUsersDao();

const app = createAppServer({
  webpack: "http://localhost:8080",
  secure: ["/api/"],
  ...users,
});

app.get(
  "/api/users",
  handler(() => ({ users: users.users }))
);
