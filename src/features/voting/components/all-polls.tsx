"use client";

import { mockPolls } from "@/lib/poll-data";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const AllPolls = () => {

  return (
    <div className="border border-[#27272A] rounded-[15px]">
      <Accordion type="single" collapsible className="w-full">
        <div className="px-6 pt-6 pb-12">
          <h1 className="text-[22px] py-4">All Polls</h1>
          <div className="grid grid-cols-[1.2fr,0.5fr,0.4fr,0.4fr] items-center text-[14px] text-[#A1A1A9]">
            <p>Question</p>
            <p>Action</p>
            <p></p>
          </div>
          {mockPolls.map((item) => {
            // Extract valid options for the Zod schema dynamically
            const validOptions = item.options.map((option) => option.text);

            // Dynamically create the Zod schema
            const FormSchema = z.object({
              type: z.enum(validOptions as [string, ...string[]], {
                required_error: "You need to select a notification type.",
              }),
            });

            const form = useForm<z.infer<typeof FormSchema>>({
              resolver: zodResolver(FormSchema),
            });

            const onSubmit = (data: z.infer<typeof FormSchema>) => {
              console.log(data);
            };
            return (
              <AccordionItem key={item.id} value={item.id}>
                <div className="grid grid-cols-[1.2fr,0.5fr,0.4fr,0.4fr] items-center text-[14px] text-[#A1A1A9]">
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
                  <button className="text-[14px] text-[#A1A1A9] font-normal hover:underline py-2 w-[150px] rounded-md">
                    Subscribe to vote
                  </button>

                  <AccordionTrigger>View Poll</AccordionTrigger>
                </div>

                <AccordionContent>
                  <div className="h-full mx-5 px-10 py-8 space-y-12 border border-[#27272A] rounded-[15px]">
                    <div className="flex items-center justify-between">
                      <h1 className="text-[#A1A1A9] text-[20px]">
                        {item.question}
                      </h1>
                      {/* Voting Form */}
                      <div>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex items-start space-x-6"
                          >
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel></FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex space-x-4"
                                    >
                                      {item.options.map((option, index) => (
                                        <FormItem
                                          key={index}
                                          className="flex items-center space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <RadioGroupItem
                                              value={option.text}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {option.text}
                                          </FormLabel>
                                        </FormItem>
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              className="font-normal bg-inherit hover:underline hover:bg-black border-none"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </div>
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
                                initial={{ height: 0 }}
                                animate={{ height: barHeight }}
                                transition={{
                                  duration: 0.5,
                                  delay: 0.2,
                                  ease: "linear",
                                }}
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
            );
          })}
        </div>
      </Accordion>
    </div>
  );
};
