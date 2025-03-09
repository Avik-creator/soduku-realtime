"use client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverAnchor, PopoverTrigger } from "../ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useSelf } from "@liveblocks/react/suspense";
import { AnimatePresence, motion } from "framer-motion";
import { useOthersInfo } from "@/hooks/useOtherInfo";
import { InviteDialog } from "./inviteDialog";

export function AvatarStack(){
    const others = useOthersInfo();
    const animationProps = {
        initial: {width: 0, transformOrigin: "left"},
        animate: {width: "auto", height: "auto"},
        exit: {width: 0, transformOrigin: "right"}
    }

    const currentUser = useSelf();

    return(
       <TooltipProvider delayDuration={0}>
      <Popover>
        <div className="flex items-center sm:justify-end">
          <InviteDialog />
          <AnimatePresence>
            {others
              .slice(0, others.length)
              .reverse()
              .map(([key, { name, avatar, color }]) => (
                <motion.div
                  key={key}
                  {...animationProps}
                  className="flex justify-center"
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <PopoverTrigger asChild>
                        <Avatar
                          style={{
                            outlineColor: color
                          }}
                          className={cn(
                            "size-7 border-2 border-primary-foreground outline outline-3"
                          )}
                        >
                          <AvatarImage src={avatar} />
                          <AvatarFallback>{name}</AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{name}</p>
                    </TooltipContent>
                    <PopoverContent className="w-auto px-3 py-1.5 text-sm">
                      <PopoverAnchor className="fill-border" />
                      <p>{name}</p>
                    </PopoverContent>
                  </Tooltip>
                </motion.div>
              ))}
            {currentUser ? (
              <motion.div
                key="you"
                {...animationProps}
                className="flex justify-center"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="size-7 border-2 border-primary-foreground outline outline-3 outline-blue-500">
                      <AvatarImage src={currentUser.info.avatar} />
                      <AvatarFallback>{currentUser.info.name}</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>You</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Popover>
    </TooltipProvider>
    )
}