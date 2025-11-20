import { Plus, Trash2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldDescription,
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

export default function Form() {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Personal Details</FieldLegend>
          <FieldDescription>Tell us about yourself.</FieldDescription>

          <FieldGroup>
            <FieldGroup className="flex-row">
              <Field>
                <FieldLabel>First name</FieldLabel>
                <Input type="text" name="firstname" placeholder="eg: Heylow" />
                {/*<FieldError>Error</FieldError>*/}
              </Field>

              <Field>
                <FieldLabel>Last name</FieldLabel>
                <Input type="text" name="lastname" placeholder="eg: World" />
                {/*<FieldError>Error</FieldError>*/}
              </Field>
            </FieldGroup>

            <FieldGroup className="flex-row">
              <Field>
                <FieldLabel>Date Of Birth</FieldLabel>
                <Input type="date" name="dateOfBirth" />
                {/*<FieldError>Error</FieldError>*/}
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="text"
                  name="email"
                  placeholder="eg: example@exg.com"
                />
                {/*<FieldError>Error</FieldError>*/}
              </Field>
            </FieldGroup>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Tech Stack</FieldLegend>
          <FieldDescription>Tell us about your tech stack.</FieldDescription>
          <FieldGroup className="gap-3">
            <Field>
              <InputGroup>
                <InputGroupInput
                  type="text"
                  name="stack1"
                  placeholder="eg: Typescript"
                />
                <InputGroupAddon align={"inline-end"}>
                  <InputGroupButton size={"icon-sm"}>
                    <Trash2 className="stroke-destructive" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <InputGroup>
                <InputGroupInput
                  type="text"
                  name="stack1"
                  placeholder="eg: Typescript"
                />
                <InputGroupAddon align={"inline-end"}>
                  <InputGroupButton size={"icon-sm"}>
                    <Trash2 className="stroke-destructive" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Button type="button" variant={"outline"} className="w-fit">
              <Plus />
              <span>Add</span>
            </Button>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>Experience</FieldLegend>
          <FieldDescription>Tell us about your experience.</FieldDescription>

          <FieldGroup>
            <FieldGroup className="gap-3">
              <Field orientation={"horizontal"}>
                <FieldLabel>Are you currently employed?</FieldLabel>
                <Switch />
              </Field>

              <Field>
                <Input name="companyName" placeholder="Name of Company" />
              </Field>
            </FieldGroup>

            <FieldGroup className="gap-3">
              <Field orientation={"horizontal"}>
                <FieldLabel>Are you currently schooling?</FieldLabel>
                <Switch />
              </Field>

              <Field>
                <Input name="schoolName" placeholder="Name of School" />
              </Field>
            </FieldGroup>
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
