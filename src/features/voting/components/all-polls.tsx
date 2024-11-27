"use client";

import { mockPolls } from "@/lib/poll-data";
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const AllPolls = () => {
  return (
    <div className="border border-[#27272A] rounded-[15px]">
      <Accordion type="single" collapsible className="w-full">
        <div className="px-6 pt-6 pb-12">
          <h1 className="text-[22px] py-4">All Polls</h1>
          <div className="grid grid-cols-[0.6fr,1.2fr,0.5fr,0.4fr] items-center text-[14px] text-[#A1A1A9]">
            <p>Deadline</p>
            <p>Question</p>
            <p>Action</p>
            <p></p>
          </div>
          {mockPolls.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <div className="grid grid-cols-[0.6fr,1.2fr,0.5fr,0.4fr] items-center text-[14px] text-[#A1A1A9]">
                <div>{item.deadline}</div>
                <div>{item.question}</div>
                <div>
                  {item.action === "Awaiting Results" && (
                    <div className="text-[#D67975]">{item.action}</div>
                  )}
                  {item.action === "Poll Closed" && <div>{item.action}</div>}
                  {item.action === "Vote Now" && (
                    <div className="text-[#90DA85]">{item.action}</div>
                  )}
                </div>

                <AccordionTrigger>View Poll</AccordionTrigger>
              </div>

              <AccordionContent>
                <div className="h-full mx-5 px-10 py-8 space-y-12 border border-[#27272A] rounded-[15px]">
                  <h1 className="text-[#A1A1A9] text-[20px]">
                    {item.question}
                  </h1>
                  <ul className="flex items-end space-x-4 h-52">
                    {item.options.map((option, index) => {
                      // Calculate the maximum votes for normalization
                      const maxVotes = Math.max(
                        ...item.options.map((opt) => opt.votes)
                      );
                      const containerHeight = 150;
                      const barHeight =
                        maxVotes > 0
                          ? (option.votes / maxVotes) * containerHeight
                          : 0;
                          
                      return (
                        <li
                          key={index}
                          className="flex flex-col items-center justify-end h-full"
                          style={{ flex: 1 }}
                        >
                          <div className="flex flex-col">
                            {/* Vote Count */}
                            <span className="text-[18px]  p-2 text-[#A1A1A9]">
                              {option.votes}
                            </span>
                            {/* Bar */}
                            <motion.div
                              className="w-40  rounded-se-[15px] transition-all duration-300 ease-in-out"
                              initial={{height: 0}}
                              animate={{height: barHeight}}
                              transition={{ duration: 0.5, delay: 0.2, ease: "linear" }}
                              style={{
                                backgroundColor: `hsl(${
                                  220 + index * 20
                                }, 70%, 60%)`,
                              }}
                            ></motion.div>
                            {/* Option Text */}
                            <p className="mt-2  text-[14px] text-[#A1A1A9]">
                              {option.text}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      </Accordion>
    </div>
  );
};
