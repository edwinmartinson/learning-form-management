import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  dateOfBirth: z.string().date(),
  email: z.email(),
  stack: z.preprocess(
    (val: string) => JSON.parse(val),
    z.array(z.string().min(2).max(100)),
  ),
  experience: z.preprocess(
    (val: string) => JSON.parse(val),
    z.discriminatedUnion("status", [
      z.object({
        status: z.literal("unemployed"),
      }),
      z.object({
        status: z.literal("employed"),
        company: z.string().min(2).max(100),
      }),
      z.object({
        status: z.literal("student"),
        school: z.string().min(2).max(100),
      }),
    ]),
  ),
});
