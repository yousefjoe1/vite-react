import { useToast } from "@chakra-ui/react";

const useMsg = () => {
  let toast = useToast();
  let msg = (
    msg = "",
    status: "error" | "success" | "info" | "warning" | "loading" = "success",
    timev = 3000
  ) => {
    toast({ title: msg, status: status, duration: timev });
  };
  return {msg};
};

export default useMsg;
