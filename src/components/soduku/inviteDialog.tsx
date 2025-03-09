import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "../ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";

export const InviteDialog = () => {
    const [copied, setCopied] = useState(false);
    const [fullUrl, setFullUrl] = useState("");
    const [timeoutId, setTimeoutId] = useState<number | NodeJS.Timeout | null>(null);

    const pathname = usePathname();

    const animationProps = {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
        transition: { duration: 0.1 }
  }

  useEffect(() => {
    if(typeof window !== "undefined"){
      setFullUrl(window.location.origin + pathname);
    }
  }, [pathname])
  
const copyToClipboard = async () => {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(fullUrl);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = fullUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
        }
        
        setCopied(true);
        if (timeoutId) clearTimeout(timeoutId);
        setTimeoutId(setTimeout(() => setCopied(false), 2000));
    } catch (err) {
        console.error("Failed to copy:", err);
    }
};

return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="h-auto first:mr-auto sm:hidden">
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share with friends</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Button
              variant="outline"
              className="w-full rounded"
              onClick={copyToClipboard}
              disabled={copied}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    className="flex place-items-center gap-1"
                    {...animationProps}
                  >
                    <Check className="mr-1 size-4" />
                    Copied!
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    className="flex place-items-center gap-1"
                    {...animationProps}
                  >
                    <Link className="mr-1 size-4" />
                    Copy link
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            <p className="text-muted-foreground text-xs">
              Share link to play together
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-1/2">
              <QRCode value={fullUrl} className="size-full" />
            </div>
            <p className="text-muted-foreground text-xs">
              Scan code to join game
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
)

}