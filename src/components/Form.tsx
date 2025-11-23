import { useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import type z from "zod";
import type { formSchema } from "@/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import action from "@/action";
import { toast } from "sonner";
import type { ZodFlattenedError } from "zod";

type AllPossibleKeys<U> = U extends U ? keyof U : never;
type Data = z.infer<typeof formSchema>;
type Errors = ZodFlattenedError<z.infer<typeof formSchema>>["fieldErrors"];

const initialData: Data = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  stack: [""],
  experience: {
    status: "unemployed",
  },
};

export default function Form() {
  const [data, setData] = useState<Data>(initialData);
  const [errors, setErrors] = useState<Errors>();

  const handleDataChange = (
    key: keyof Data,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    subKey?: AllPossibleKeys<Data["experience"]>,
  ) => {
    if (key === "experience" && subKey) {
      setData((prev) => ({
        ...prev,
        experience: { ...prev.experience, [subKey]: value },
      }));
    }

    if (key !== "experience" && key !== "stack") {
      setData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleReset = () => {
    setData(initialData);
    setErrors({});
  };

  const handleSubmission = (formData: FormData) => {
    try {
      const result = action(formData);

      if (result.status === "FAIL") {
        setData({
          ...result.data,
          stack: JSON.parse(result.data.stack as unknown as string),
          experience: JSON.parse(result.data.experience as unknown as string),
        });
        setErrors(result.errors);
      }

      if (result.status === "SUCCESS") {
        toast.success(result.message);
      } else toast.error(result.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const handleFormChange = (form: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(form.currentTarget);
    const result = action(formData);

    if (result.status === "FAIL") {
      setErrors(result.errors);
    }
  };

  const addStack = (stack: string) => {
    // setStack((prev) => [...prev, stack]);
    setData((prev) => ({ ...prev, stack: [...prev.stack, stack] }));
  };

  const updateStack = (index: number, stack: string) => {
    setData((prev) => ({
      ...prev,
      stack: prev.stack.map((item, i) => (i === index ? stack : item)),
    }));
  };

  const removeStack = (index: number) => {
    if (data.stack.length === 1) return;
    setData((prev) => ({
      ...prev,
      stack: prev.stack.filter((_, i) => i !== index),
    }));
  };

  return (
    <form
      onChange={handleFormChange}
      action={handleSubmission}
      onReset={() => handleReset()}
    >
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Personal Details</FieldLegend>
          <FieldDescription>Tell us about yourself.</FieldDescription>

          <FieldGroup>
            <FieldGroup className="flex-row">
              <Field>
                <FieldLabel>First name</FieldLabel>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="eg: Heylow"
                  value={data.firstName}
                  onChange={(e) =>
                    handleDataChange("firstName", e.target.value)
                  }
                />
                {errors?.firstName && (
                  <FieldError>{errors.firstName.at(0)}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Last name</FieldLabel>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="eg: World"
                  value={data.lastName}
                  onChange={(e) => handleDataChange("lastName", e.target.value)}
                />
                {errors?.lastName && (
                  <FieldError>{errors.lastName.at(0)}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup className="flex-row">
              <Field>
                <FieldLabel>Date Of Birth</FieldLabel>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={data.dateOfBirth}
                  onChange={(e) =>
                    handleDataChange("dateOfBirth", e.target.value)
                  }
                />
                {errors?.dateOfBirth && (
                  <FieldError>{errors.dateOfBirth.at(0)}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="text"
                  name="email"
                  placeholder="eg: example@exg.com"
                  value={data.email}
                  onChange={(e) => handleDataChange("email", e.target.value)}
                />
                {errors?.email && <FieldError>{errors.email.at(0)}</FieldError>}
              </Field>
            </FieldGroup>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Tech Stack</FieldLegend>
          <FieldDescription>Tell us about your tech stack.</FieldDescription>
          <FieldGroup className="gap-3">
            <Input
              type="hidden"
              name="stack"
              value={JSON.stringify(data.stack)}
            />
            {data.stack.map((item, index) => (
              <Field key={index}>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    name="stack1"
                    placeholder="eg: Typescript"
                    value={item}
                    onChange={(e) => updateStack(index, e.target.value)}
                  />
                  <InputGroupAddon align={"inline-end"}>
                    <InputGroupButton
                      size={"icon-sm"}
                      onClick={() => removeStack(index)}
                    >
                      <Trash2 className="stroke-destructive" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            ))}

            <Button
              type="button"
              variant={"outline"}
              className="w-fit"
              onClick={() => addStack("")}
            >
              <Plus />
              <span>Add</span>
            </Button>

            {errors?.stack && <FieldError>{errors.stack}</FieldError>}
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Experience</FieldLegend>
          <FieldDescription>Tell us about your experience.</FieldDescription>

          <Input
            type="hidden"
            name="experience"
            value={JSON.stringify(data.experience)}
          />

          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel>What best describes you?</FieldLabel>
              <Select
                name="status"
                defaultValue={data.experience.status}
                onValueChange={(value) =>
                  handleDataChange("experience", value, "status")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {data.experience.status === "employed" && (
              <Field>
                <FieldLabel>Name Of Company</FieldLabel>
                <Input
                  name="company"
                  placeholder="Name of Company"
                  value={data.experience.company}
                  onChange={(e) =>
                    handleDataChange("experience", e.target.value, "company")
                  }
                />
                {errors?.experience && (
                  <FieldError>{errors.experience.at(0)}</FieldError>
                )}
              </Field>
            )}

            {data.experience.status === "student" && (
              <Field>
                <FieldLabel>Name Of School</FieldLabel>
                <Input
                  name="school"
                  placeholder="eg: Greenwich University"
                  value={data.experience.school}
                  onChange={(e) =>
                    handleDataChange("experience", e.target.value, "school")
                  }
                />
                {errors?.experience && (
                  <FieldError>{errors.experience.at(0)}</FieldError>
                )}
              </Field>
            )}
          </FieldGroup>
        </FieldSet>

        <Field orientation={"horizontal"} className="justify-end">
          <Button type="reset" variant={"outline"}>
            Reset
          </Button>
          <Button type="submit">Register</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
