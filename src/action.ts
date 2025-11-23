import { z, type ZodFlattenedError } from "zod";
import { formSchema } from "./zod";

type Return<T> =
  | {
      status: "SUCCESS";
      message?: string;
      data: T;
      timestamp: number;
    }
  | {
      status: "FAIL";
      message?: string;
      data: T;
      errors: ZodFlattenedError<z.infer<typeof formSchema>>["fieldErrors"];
      timestamp: number;
    }
  | {
      status: "ERROR";
      message?: string;
      timestamp: number;
    };

export default function action(
  formData: FormData,
): Return<z.infer<typeof formSchema>> {
  try {
    const submission = Object.fromEntries(formData);
    const validation = formSchema.safeParse(submission);

    if (!validation.success) {
      return {
        status: "FAIL",
        message: "Invalid form data",
        data: submission as unknown as z.infer<typeof formSchema>,
        errors: z.flattenError(validation.error).fieldErrors,
        timestamp: Date.now(),
      };
    }

    return {
      status: "SUCCESS",
      message: "Form submitted successfully",
      data: validation.data,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error instanceof Error ? error.message : (error as string),
      timestamp: Date.now(),
    };
  }
}
