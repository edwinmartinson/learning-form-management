import { BriefcaseBusiness, GraduationCap, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CardModal() {
  return (
    <AlertDialog open>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-sm">
        <div className="bg-muted grid size-10 place-content-center rounded-lg">
          <User className="stroke-primary" />
        </div>

        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <span>Edwin Martinson</span>
            {/*<BriefcaseBusiness className="stroke-muted-foreground" size={16} />*/}

            <Tooltip>
              <TooltipTrigger>
                <GraduationCap className="stroke-muted-foreground" size={16} />
              </TooltipTrigger>
              <TooltipContent>
                <p>UNION SYSTEM GLOBAL</p>
              </TooltipContent>
            </Tooltip>
          </AlertDialogTitle>
          <AlertDialogDescription>
            edwinotumartinson@outlook.com
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-wrap gap-2">
          <div className="bg-primary rounded-lg px-2.5 py-0.5 text-sm font-medium">
            TypeScript
          </div>
          <div className="bg-primary rounded-lg px-2.5 py-0.5 text-sm font-medium">
            JavaScript
          </div>
          <div className="bg-primary rounded-lg px-2.5 py-0.5 text-sm font-medium">
            React.JS
          </div>

          <div className="bg-primary rounded-lg px-2.5 py-0.5 text-sm font-medium">
            Node.JS
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
