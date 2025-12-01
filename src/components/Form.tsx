import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const form = useForm<FormSchema>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      email: "",
      stack: [{ technology: "" }],
      experience: { status: "unemployed" },
    },
    resolver: zodResolver(formSchema),
  });

  const stack = useFieldArray({
    control: form.control,
    name: "stack",
  });

  const experienceStatus = form.watch("experience.status");
  const isSubmitting = form.formState.isSubmitting;

  const action: SubmitHandler<FormSchema> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    form.reset();
    setDetails(data);
    setShowCard(true);
    toast.success("Registration successful.");
  };

  return (
    <>
      <CardModal
        showCard={showCard}
        setShowCard={setShowCard}
        details={details}
      />
      <form onSubmit={form.handleSubmit(action)}>
        <FieldGroup>
          <FieldSet disabled={isSubmitting}>
            <FieldLegend>Personal Details</FieldLegend>
            <FieldDescription>Tell us about yourself.</FieldDescription>

            <FieldGroup>
              <FieldGroup className="flex-row">
                <Controller
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>First name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="eg: Heylow"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="eg: Heylow"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className="flex-row">
                <Controller
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Date Of Birth
                      </FieldLabel>
                      <Input
                        {...field}
                        type="date"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="eg: example@exg.com"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldGroup>
          </FieldSet>

          <FieldSet disabled={isSubmitting}>
            <FieldLegend>Tech Stack</FieldLegend>
            <FieldDescription>Tell us about your tech stack.</FieldDescription>
            {form.formState.errors.stack?.root && (
              <FieldError errors={[form.formState.errors.stack.root]} />
            )}
            <FieldGroup className="gap-3">
              {stack.fields.map((item, index) => (
                <Controller
                  key={item.id}
                  control={form.control}
                  name={`stack.${index}.technology`}
                  render={({ field, fieldState }) => (
                    <Field>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          id={field.name}
                          placeholder="eg: JavaScript"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align={"inline-end"}>
                          <InputGroupButton
                            size={"icon-sm"}
                            onClick={() => stack.remove(index)}
                          >
                            <Trash2 className="stroke-destructive" />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}

              <Button
                type="button"
                variant={"outline"}
                className="w-fit"
                onClick={() => stack.append({ technology: "" })}
              >
                <Plus />
                <span>Add</span>
              </Button>
            </FieldGroup>
          </FieldSet>

          <FieldSet disabled={isSubmitting}>
            <FieldLegend>Experience</FieldLegend>
            <FieldDescription>Tell us about your experience.</FieldDescription>

            <FieldGroup className="gap-3">
              <Controller
                control={form.control}
                name="experience.status"
                render={({
                  field: { onChange, onBlur, ...field },
                  fieldState,
                }) => (
                  <Field>
                    <FieldLabel>What best describes you?</FieldLabel>
                    <Select
                      {...field}
                      name={field.name}
                      onValueChange={onChange}
                    >
                      <SelectTrigger
                        className="w-full"
                        onBlur={onBlur}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>

                      <SelectContent id={field.name}>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {experienceStatus === "employed" && (
                <Controller
                  control={form.control}
                  name="experience.company"
                  render={({ field: { value, ...field }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Name Of Company
                      </FieldLabel>
                      <Input
                        {...field}
                        value={value ?? ""}
                        id={field.name}
                        placeholder="eg: Microsoft"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}

              {experienceStatus === "student" && (
                <Controller
                  control={form.control}
                  name="experience.school"
                  render={({ field: { value, ...field }, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Name Of School
                      </FieldLabel>
                      <Input
                        {...field}
                        value={value ?? ""}
                        id={field.name}
                        placeholder="eg: Greenwich University"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}
            </FieldGroup>
          </FieldSet>

          {form.formState.errors.root && (
            <FieldError errors={[form.formState.errors.root]} />
          )}

          <Field className="grid grid-cols-2">
            <Button
              className="w-full"
              type="reset"
              variant={"outline"}
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
