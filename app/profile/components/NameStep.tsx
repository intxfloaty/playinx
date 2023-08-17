import React, { useEffect, useState } from "react";
import { Button, Input, Link , Text} from "../../chakraExports";

function NameStep({ onNext, goBack, onNameChange }) {
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });
  const [nameError, setNameError] = useState("");

  const handleNameUpdate = () => {
    onNameChange(name); // Pass the name object to the parent
  };

  const validate = () => {
    let error = "";
    if (!name.firstName) {
      error = "First name is required";
    }
    return error;
  };

  useEffect(() => {
    if (nameError !== "") {
      setNameError(validate());
    }
  }, [name.firstName]);

  return (
    <>
      <Input
        type="text"
        isInvalid={!!nameError}
        errorBorderColor={nameError ? "#FFB400" : ""}
        textColor="antiquewhite"
        placeholder="First Name"
        size="md"
        value={name.firstName}
        onChange={(e) => setName({ ...name, firstName: e.target.value })}
      />
      {nameError && (
        <Text fontSize="md" color="#FFB400">
          {nameError}
        </Text>
      )}
      <Input
        type="text"
        textColor="antiquewhite"
        placeholder="Last Name"
        size="md"
        value={name.lastName}
        onChange={(e) => setName({ ...name, lastName: e.target.value })}
      />
      <Button
        mt={7}
        colorScheme="messenger"
        size="md"
        onClick={() => {
          const error = validate();
          setNameError(error);
          if (!error) {
            onNext();
            handleNameUpdate();
          }
        }}
      >
        Continue
      </Button>
      {/* <Center mt={1}><button onClick={goBack}><Text fontSize='md' color="messenger.300">Go Back</Text></button></Center> */}
    </>
  );
}

export default NameStep;
