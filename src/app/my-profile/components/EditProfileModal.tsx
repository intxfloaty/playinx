import React, { useEffect, useState } from 'react'
import { Box, Button, Text, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, InputGroup, InputLeftAddon, Wrap, Avatar, WrapItem, Center } from '../../chakraExports'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FaEdit } from 'react-icons/fa';
import { v4 as uuidv4 } from "uuid";


interface Errors {
  [key: string]: string;
}

const EditProfileModal = ({ isOpen, onClose, myProfile, myUserId }) => {
  const supabase = createClientComponentClient()
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false)
  const [imageURL, setImageURL] = useState("");


  const uploadImage = async (e) => {
    // Fetch all the user's existing images
    const { data: existingImages, error: fetchError } = await supabase.storage
      .from("event_banners")
      .list(`${myUserId}`);

    if (fetchError) {
      console.error("Error fetching existing images", fetchError);
    } else {
      // Delete all the existing images
      const deletePromises = existingImages.map((image) =>
        supabase.storage.from("event_banners").remove([`${myUserId}/${image.name}`])
      );

      // Delete all the images first and then upload the new one
      await Promise.all(deletePromises);
    }

    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("event_banners")
      .upload(myUserId + "/" + uuidv4(), file);

    if (!error) {
      setImageURL(`https://doplgubkrufldxyduvlh.supabase.co/storage/v1/object/public/event_banners/${data?.path}`);
    } else console.log(error, "uploadImageErr");
  };


  const validate = () => {
    let errors: Errors = {};
    if (!name) {
      errors.name = "Name is required"
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (Number(phoneNumber.length) !== 10) {
      errors.phoneNumber = "Phone number must have 10 digits";
    }
    if (!DOB) {
      errors.DOB = "Date of birth is required";
    } else {
      // Parse the selected date into a Date object
      const selectedDate = new Date(DOB);
      // Get today's date
      const currentDate = new Date();
      // Set a minimum date (adjust this value as needed)
      const minimumDate = new Date("1950-01-01");

      // Compare the selected date with today's date
      if (selectedDate > currentDate) {
        errors.DOB = "Date of birth cannot be in the future";
      } else if (selectedDate < minimumDate) {
        errors.DOB = "Date of birth is too early";
      }
    }
    if (!gender) {
      errors.gender = "Gender is required";
    }
    if (!position) {
      errors.position = "Playing position is required";
    }

    return errors;
  };

  const onSaveClicked = async () => {
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: name,
          phone: phoneNumber,
          dob: DOB,
          gender: gender,
          position: position,
          avatar_URL: imageURL
        })
        .eq("user_id", `${myUserId}`);

      console.log(error, "MyProfileERR")
      setIsLoading(false);
      if (!error) onClose();
    }
  }

  useEffect(() => {
    setImageURL(myProfile?.avatar_URL)
    setName(myProfile?.name)
    setPhoneNumber(myProfile?.phone)
    setDOB(myProfile?.dob)
    setGender(myProfile?.gender)
    setPosition(myProfile?.position)
  }, [myProfile])

  useEffect(() => {
    if (Object.keys(fieldErrors).length !== 0) {
      setFieldErrors(validate());
    }
  }, [name, phoneNumber, DOB, gender, position]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center flexDir="column">
            <Wrap>
              <WrapItem>
                <label style={{ position: "relative", display: "inline-block" }}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => uploadImage(e)}
                  />
                  <Avatar
                    size="xl"
                    name={myProfile?.name}
                    src={imageURL}
                  />
                  <FaEdit style={{ position: "absolute", bottom: 2, right: 2 }} size={18} color="#000" />
                </label>
              </WrapItem>
            </Wrap>
            <Text fontSize="sm" mt="2" color="gray.500">
                  *Accepted formats: PNG, JPEG
                </Text>
                <Text fontSize="sm" mt="2" color="gray.500">
                  *Image size should not exceed 2mb
                </Text>
          </Center>
          <FormControl isRequired>
            <Box mb={5}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                isInvalid={!!fieldErrors?.name}
                errorBorderColor={fieldErrors?.name ? "#FFB400" : ""}
                textColor="black"
                placeholder="Name"
                size="md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {fieldErrors?.name && (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors?.name}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Phone</FormLabel>
              <InputGroup size="md">
                <InputLeftAddon children="+91" bg="#161616" textColor="antiquewhite" />
                <Input
                  type="number"
                  isInvalid={!!fieldErrors?.phoneNumber}
                  errorBorderColor={fieldErrors?.phoneNumber ? "#FFB400" : ""}
                  placeholder="Phone number"
                  textColor="black"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </InputGroup>
              {fieldErrors?.phoneNumber && (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors?.phoneNumber}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Date of birth</FormLabel>
              <Input
                type="date"
                isInvalid={!!fieldErrors.DOB}
                errorBorderColor={fieldErrors.DOB ? "#FFB400" : ""}
                textColor="black"
                size="md"
                value={DOB}
                onChange={(e) => {
                  setDOB(e.target.value);
                }}
                min="1950-01-01" // Set a realistic minimum date
                max={new Date().toISOString().split("T")[0]} // Set the max attribute to today's date
              />
              {fieldErrors.DOB && (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.DOB}
                </Text>
              )}
            </Box>

            <Box mb={5}>
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder="Select gender"
                isInvalid={!!fieldErrors.gender}
                errorBorderColor={fieldErrors.gender ? "#FFB400" : ""}
                size="md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
              {fieldErrors.gender && (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors.gender}
                </Text>
              )}
            </Box>

            <Box>
              <FormLabel>Playing position</FormLabel>
              <Select
                placeholder="Select position"
                isInvalid={!!fieldErrors?.position}
                errorBorderColor={fieldErrors?.position ? "#FFB400" : ""}
                size="md"
                value={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              >
                <option value="Goal-Keeper">Goal-Keeper</option>
                <option value="Defence">Defence</option>
                <option value="Mid-Field">Mid-Field</option>
                <option value="Attack">Attack</option>
              </Select>
              {fieldErrors?.position && (
                <Text fontSize="md" color="#FFB400">
                  {fieldErrors?.position}
                </Text>
              )}
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={isLoading} colorScheme="messenger" onClick={onSaveClicked}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditProfileModal