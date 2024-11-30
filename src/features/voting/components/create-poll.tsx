"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, X, GripVertical } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

export const CreatePoll = () => {
  const formSchema = z.object({
    question: z.string().min(1, "Question is required"),
    options: z
      .array(z.string().min(1, "Option is required"))
      .min(2, "At least two options are required"),
    deadline: z.string().min(1, "Deadline is required"),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: ["", ""],
      deadline: "",
    },
  });
  // type FormData = z.infer<typeof formSchema>;

  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-expect-error @typescript-eslint/ban-ts-comment
    name: "options",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Card className="w-full py-3 rounded-[15px] max-w-2xl bg-[#09090B] text-white border-[#27272A]">
        <CardHeader>
          <CardTitle className="text-[22px] font-normal">
            Create New Poll
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="question" className="text-[16px] font-normal">
                  Question
                </Label>
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem className="space-y-[-2px] ">
                      <FormLabel className=""></FormLabel>
                      <FormControl>
                        <Input
                          id="question"
                          {...field}
                          className="bg-[#09090B] border-[#27272A] h-10 rounded-[10px]"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
              <Label htmlFor="question" className="text-[16px] font-normal">
                  Options
                </Label>
                <ul>
                  {fields.map((item, index) => (
                    <li key={item.id}
                    className="pb-3 space-x-6">
                      <input
                       className="bg-[#09090B] border border-[#27272A] w-1/2 h-10 pl-4 rounded-[10px] placeholder:text-[#A1A1A9]"
                      placeholder={`Option ${index + 1}`}
                      {...form.register(`options.${index}`)} />
                      {/* <Controller
                        render={({ field }) => <input {...field} />}
                        name={`options.${index}`}
                        control={form.control}
                      /> */}
                      <button type="button" onClick={() => remove(index)}>
                        <Image
                        src="/close.svg"
                        alt="delete"
                        width={12}
                        height={12}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
                <Button
                  type="button"
                  className="bg-white text-black font-normal hover:bg-zinc-300 transition px-6"
                  onClick={() => append("")} 
                >
                  Add option
                </Button>
                {/* <input type="submit" /> */}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="deadline" className="text-[16px] font-normal">
                  Deadline
                </Label>
                <div className="relative flex items-center">
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem className="space-y-[-2px] ">
                        <FormLabel className=""></FormLabel>
                        <FormControl>
                          <Input
                            id="deadline"
                            type="datetime-local"
                            {...field}
                            className="bg-[#09090B] border-[#27272A] h-10 rounded-[10px] pl-10"
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                </div>
              </div> */}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-white text-black font-normal hover:bg-zinc-300 transition px-6 h-10"
                >
                  Create poll
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
