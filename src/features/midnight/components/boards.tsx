"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BrowserDeployedBoardManager } from "@/lib/quetion-contract";
import { RiContactsBookLine } from "react-icons/ri";
import {
  BehaviorSubject,
  type Observable,
  concatMap,
  filter,
  firstValueFrom,
  interval,
  map,
  of,
  take,
  tap,
  throwError,
  timeout,
  catchError,
} from "rxjs";
import { Board } from "./board";
import { useState } from "react";
import { useShowToast } from "../hooks/use-show-toast";
import { useMessageLoading } from "../hooks/use-message-loading-map";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { NewBoard } from "./new-board";
import { QuestionModal } from "./question-modal";
import { motion } from "framer-motion";
import { DialogTitle } from "@radix-ui/react-dialog";

export const Boards = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isDisabled } = useShowToast();
  const { isLoading } = useMessageLoading();
  const data = [{address: "020065580b14427e09c2fe75ff12175b4b3bec2f42d38809020ed8084f7986654827"}];
  
  const onCreateBoard = async () => {
    const quetionsApiProvider = new BrowserDeployedBoardManager();    
    const deployment$ = await quetionsApiProvider.resolve(); 
    const deployment = await firstValueFrom(deployment$);  
    toast.success("Board was successfully created"); 
    setIsDialogOpen(false);
    if (deployment.status === "deployed") {
      console.log("address", deployment.api.deployedContractAddress);
      //TODO: mutation
    }
  };
 
  return (
    <div className="relative w-full h-screen overflow-y-auto flex pt-[210px] justify-center items-start ">
      <div className="grid grid-cols-4 gap-7 ">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <NewBoard onClick={setIsDialogOpen} />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <div>
              <QuestionModal onCreateBoardCallback={onCreateBoard} />
            </div>
          </DialogContent>
        </Dialog>

        {data ? (
          data.map((item, index) => (
            <Board key={index} address={item.address} index={index} />
          ))
        ) : (
          <>
            <BoardSkeleton />
            <BoardSkeleton />
            <BoardSkeleton />
            <BoardSkeleton />
            <BoardSkeleton />
            <BoardSkeleton />
            <BoardSkeleton />
          </>
        )}
      </div>
      {(isDisabled || isLoading) && (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="absolute z-50 bottom-6 right-6 bg-[#FFFEF8]/40 flex items-start justify-center p-6 rounded-[5px] shadow-lg backdrop-blur-lg"
        >
          <div className="flex flex-col animate-pulse">
            <span className="text-[15px] text-black font-semibold">
              Generating proof . . .
            </span>
            <span className="text-[12px]">
              This might take longer than explaining zero knowledge!
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const BoardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 w-64 rounded-[4px] bg-[#FFFEF8]/30 backdrop-blur-xl" />
    </div>
  );
};
