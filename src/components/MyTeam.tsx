import React from "react";
import {
  Input,
  Stack,
  Button,
  Text,
} from "../app/chakraExports";
import CreateTeam from "./CreateTeam";
import JoinTeam from "./JoinTeam";

const MyTeam = () => {

  return (
    <>
      <Stack
        spacing={5}
        w={{
          base: "100%", // 0-48em
          md: "75%", // 48em-80em,
          xl: "50%", // 80em+
        }}
        p={{
          base: "10%",
          md: "10%",
          xl: "8%",
        }}
      >
        <CreateTeam />
        <JoinTeam />
      </Stack>
    </>
  );
};

export default MyTeam;
