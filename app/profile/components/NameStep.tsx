import React, { useState } from "react";
import { Button, Input, Link } from "../../chakraExports";

function NameStep({ onNext, goBack, onNameChange }) {
  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });

  const handleNameUpdate = () => {
    onNameChange(name); // Pass the name object to the parent
  };

  return (
    <>
      <Input
        type="text"
        textColor="antiquewhite"
        placeholder="First Name"
        size="md"
        value={name.firstName}
        onChange={(e) => setName({ ...name, firstName: e.target.value })}
      />
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
          onNext();
          handleNameUpdate();
        }}
      >
        Continue
      </Button>
      {/* <Center mt={1}><button onClick={goBack}><Text fontSize='md' color="messenger.300">Go Back</Text></button></Center> */}
    </>
  );
}

export default NameStep;
