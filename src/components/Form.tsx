import { Loader2, Plus, Trash2 } from "lucide-react";
import { useForm, useStore } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

import { formSchema, type FormSchema } from "@/zod";
import { toast } from "sonner";
import { useState } from "react";
import CardModal from "./CardModal";

export default function Form() {
  const [showCard, setShowCard] = useState<boolean>(false);
  const [details, setDetails] = useState<FormSchema | null>(null);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      stack: [{ technology: "" }],
      experience: { status: "unemployed" },
    } satisfies FormSchema as FormSchema,
    validators: {
      onChange: formSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setDetails(value);
      setShowCard(true);
      formApi.reset();
      toast.success("Registration successful.");
    },
  });

  const experienceStatus = useStore(
    form.store,
    (state) => state.values.experience.status,
  );
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

  return (
    <>
      <CardModal
        showCard={showCard}
        setShowCard={setShowCard}
        details={details}
      />
      <form action={form.handleSubmit}>
        <FieldGroup>
          <FieldSet disabled={isSubmitting}>
            <FieldLegend>Personal Details</FieldLegend>
            <FieldDescription>Tell us about yourself.</FieldDescription>

            <FieldGroup>
              <FieldGroup className="flex-row">
                <form.Field
                  name="firstName"
                  children={(field) => {
                    const { isTouched, isValid, errors } = field.state.meta;
                    const isInvalid = isTouched && !isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>First name</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="eg: Hello"
                        />
                        {isInvalid && <FieldError errors={errors} />}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="lastName"
                  children={(field) => {
                    const { isTouched, isValid, errors } = field.state.meta;
                    const isInvalid = isTouched && !isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="eg: World"
                        />
                        {isInvalid && <FieldError errors={errors} />}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>

              <FieldGroup className="flex-row">
                <form.Field
                  name="dateOfBirth"
                  children={(field) => {
                    const { isTouched, isValid, errors } = field.state.meta;
                    const isInvalid = isTouched && !isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Date of Birth
                        </FieldLabel>
                        <Input
                          type="date"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="eg: 01/01/2000"
                        />
                        {isInvalid && <FieldError errors={errors} />}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="email"
                  children={(field) => {
                    const { isTouched, isValid, errors } = field.state.meta;
                    const isInvalid = isTouched && !isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                          type="email"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="eg: hello@world.com"
                        />
                        {isInvalid && <FieldError errors={errors} />}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </FieldGroup>
          </FieldSet>

          <form.Field
            name="stack"
            mode="array"
            children={(stackFields) => (
              <FieldSet disabled={isSubmitting}>
                <FieldLegend>Tech Stack</FieldLegend>
                <FieldDescription>
                  Tell us about your tech stack.
                </FieldDescription>

                <FieldGroup className="gap-3">
                  {stackFields.state.value.map((_, index) => (
                    <form.Field
                      key={index}
                      name={`stack[${index}].technology`}
                      children={(field) => {
                        const { isTouched, isValid, errors } = field.state.meta;
                        const isInvalid = isTouched && !isValid;

                        return (
                          <Field>
                            <InputGroup>
                              <InputGroupInput
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                aria-invalid={isInvalid}
                                placeholder="eg: JavaScript"
                              />
                              <InputGroupAddon align={"inline-end"}>
                                <InputGroupButton
                                  size={"icon-sm"}
                                  onClick={() => stackFields.removeValue(index)}
                                >
                                  <Trash2 className="stroke-destructive" />
                                </InputGroupButton>
                              </InputGroupAddon>
                            </InputGroup>

                            {isInvalid && <FieldError errors={errors} />}
                          </Field>
                        );
                      }}
                    />
                  ))}

                  <Button
                    type="button"
                    variant={"outline"}
                    className="w-fit"
                    onClick={() => stackFields.pushValue({ technology: "" })}
                  >
                    <Plus />
                    <span>Add</span>
                  </Button>
                </FieldGroup>
              </FieldSet>
            )}
          />

          <FieldSet disabled={isSubmitting}>
            <FieldLegend>Experience</FieldLegend>
            <FieldDescription>Tell us about your experience.</FieldDescription>

            <FieldGroup className="gap-3">
              <form.Field
                name="experience.status"
                children={(field) => {
                  const { isTouched, isValid, errors } = field.state.meta;
                  const isInvalid = isTouched && !isValid;

                  return (
                    <Field>
                      <FieldLabel>What best describes you?</FieldLabel>
                      <Select
                        name={field.name}
                        onValueChange={(
                          e: FormSchema["experience"]["status"],
                        ) => field.handleChange(e)}
                      >
                        <SelectTrigger
                          className="w-full"
                          id={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          aria-invalid={isInvalid}
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>

                        <SelectContent id={field.name}>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>

                      {isInvalid && <FieldError errors={errors} />}
                    </Field>
                  );
                }}
              />

              {experienceStatus === "employed" && (
                <form.Field
                  name="experience.company"
                  children={(field) => {
                    const { isTouched, isValid, errors } = field.state.meta;
                    const isInvalid = isTouched && !isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Name Of Company
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="eg: Microsoft"
                        />
                        {isInvalid && <FieldError errors={errors} />}
                      </Field>
                    );
                  }}
                />
              )}

              {experienceStatus === "student" && (
                <form.Field
                  name="experience.school"
                  children={(field) => {
                    const { isTouched, isValid, errors } = field.state.meta;
                    const isInvalid = isTouched && !isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Name Of School
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value ?? ""}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="eg: Greenwich University"
                        />
                        {isInvalid && <FieldError errors={errors} />}
                      </Field>
                    );
                  }}
                />
              )}
            </FieldGroup>
          </FieldSet>

          {form.state.errors && <FieldError errors={form.state.errors} />}

          <Field className="grid grid-cols-2">
            <Button
              className="w-full"
              type="button"
              variant={"outline"}
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button className="w-full" type="submit" disabled={!canSubmit}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Register</span>
                  )}
                </Button>
              )}
            />
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
