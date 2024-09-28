import db from "@repo/db/client";
import { userAuthSchema, userAuth } from "../../../../packages/schemas";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(
        credentials: Record<"phone" | "password", string> | undefined
      ) {
        try {
          const response = userAuthSchema.safeParse(credentials);
          if (!response.success) {
            console.error("invalid Credentials");
            return null;
          }
            const { phone, password } = response.data;
            
          const hashedPassword = await bcrypt.hash(password, 10);
          const existingUser = await db.user.findFirst({
            where: {
              number: credentials?.phone,
            },
          });

          if (existingUser) {
            const passwordValidation = await bcrypt.compare(
              password,
              existingUser.password
            );
            if (passwordValidation) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number,
              };
            }
            return null;
          }

          const user = await db.user.create({
            data: {
              number: phone,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
