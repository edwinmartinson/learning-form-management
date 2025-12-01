import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  dateOfBirth: z.iso.date(),
  email: z.email(),
  stack: z.array(
    z.object({
      technology: z.string().min(2).max(100),
    }),
  ),
  experience: z.discriminatedUnion("status", [
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
});

export type FormSchema = z.infer<typeof formSchema>;
