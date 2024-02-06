import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        name: {},
        password: {}
      },
      async authorize(credentials) {
        const response = await fetch("https://front-test.hex.team/api/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json"
            },
            body: JSON.stringify({ username: credentials.name, password: credentials.password })
          }
        );
        const user = await response.json();

        if (response.ok && user) {
          cookies().set("mytoken", user.access_token);
          user.name = credentials.name;
          return user;
        }
        return null;
      },
    })
  ],
  pages: {
    signIn: "/signin"
  }
}
export default authOptions;
