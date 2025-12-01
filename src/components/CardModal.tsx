import { BriefcaseBusiness, GraduationCap, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Dispatch, SetStateAction } from "react";
import type { FormSchema } from "@/zod";

type Props = {
  showCard: boolean;
  setShowCard: Dispatch<SetStateAction<boolean>>;
  details: FormSchema | null;
};

export default function CardModal(props: Props) {
  return (
    <AlertDialog open={props.showCard}>
      <AlertDialogContent className="sm:max-w-sm">
        <div className="bg-muted grid size-10 place-content-center rounded-lg">
          <User className="stroke-primary" />
        </div>

        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <span>
              {props.details?.firstName + " " + props.details?.lastName}
            </span>

            {props.details &&
              props.details.experience.status === "employed" && (
                <Tooltip>
                  <TooltipTrigger>
                    <BriefcaseBusiness
                      className="stroke-muted-foreground"
                      size={16}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{props.details.experience.company}</p>
                  </TooltipContent>
                </Tooltip>
              )}

            {props.details && props.details.experience.status === "student" && (
              <Tooltip>
                <TooltipTrigger>
                  <GraduationCap
                    className="stroke-muted-foreground"
                    size={16}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{props.details.experience.school}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {props.details?.email}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-wrap gap-2">
          {props.details?.stack.map((stack, index) => (
            <div
              key={index}
              className="bg-primary rounded-lg px-2.5 py-0.5 text-sm font-medium"
            >
              {stack.technology}
            </div>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            className="w-full"
            onClick={() => props.setShowCard(false)}
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
