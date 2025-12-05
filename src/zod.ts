import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long" })
    .max(100, { error: "Name must be at most 100 characters long" }),
  lastName: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long" })
    .max(100, { error: "Name must be at most 100 characters long" }),
  dateOfBirth: z.iso.date({ error: "Invalid date of birth" }),
  email: z.email({ error: "Invalid email address" }),
  stack: z.array(
    z.object({
      technology: z
        .string()
        .min(2, {
          error: "Technology name must be at least 2 characters long",
        })
        .max(100, {
          error: "Technology name must be at most 100 characters long",
        }),
    }),
  ),
  experience: z.discriminatedUnion("status", [
    z.object({
      status: z.literal("unemployed", { error: "Invalid status" }),
    }),
    z.object({
      status: z.literal("employed", { error: "Invalid status" }),
      company: z
        .string()
        .min(2, { error: "Company name must be at least 2 characters long" })
        .max(100, {
          error: "Company name must be at most 100 characters long",
        }),
    }),
    z.object({
      status: z.literal("student", { error: "Invalid status" }),
      school: z
        .string()
        .min(2, { error: "School name must be at least 2 characters long" })
        .max(100, { error: "School name must be at most 100 characters long" }),
    }),
  ]),
});

export type FormSchema = z.infer<typeof formSchema>;
