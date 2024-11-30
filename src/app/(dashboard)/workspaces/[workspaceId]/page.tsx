import { getCurrent } from "@/features/auth/queries";
import { AllPolls } from "@/features/voting/components/all-polls";
import { CreatePoll } from "@/features/voting/components/create-poll";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  return (
    <div className=" px-14 pt-32 pb-14 overflow-y-auto h-full flex flex-col justify-start space-y-12">
      <CreatePoll />
      <AllPolls />
    </div>
  );
};

export default WorkspaceIdPage;
