// "use client"
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Text,
//   Button,
//   useDisclosure,
//   Flex,
//   FormLabel,
//   Select,
//   FormControl,
//   Stack,
// } from '../../chakraExports'
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { match } from "assert";
// import { GiWhistle } from "react-icons/gi";
// import { IoFootballOutline, IoPeopleOutline, IoTimeOutline, IoLocationOutline } from "react-icons/io5";

// const Tournament = ({ user }) => {
//   const supabase = createClientComponentClient();
//   const [location, setLocation] = useState("");
//   // const [fixedMatches, setFixedMatches] = useState<Match[]>([]);

//   return (
//     <Box p={3}>
//       <Box my={5} >
//         <FormControl>
//           {/* <FormLabel color="#E7E9EA">Location</FormLabel> */}
//           <Select
//             placeholder="Select ground"
//             onChange={(e) => setLocation(e.target.value)}
//             color="#E7E9EA"
//           >
//             <option value="MRIS, Charmwood">MRIS, Charmwood</option>
//             <option value="Base Camp, Vasant Kunj">
//               Base Camp, Vasant Kunj
//             </option>
//             <option value="AB Plaza, Vasant Kunj">AB Plaza, Vasant Kunj</option>
//             <option value="Kicksal">Kicksal</option>
//           </Select>
//         </FormControl>
//       </Box>

//       <Box backgroundColor="#161616" borderRadius={7} mt={4}>
//         <Flex
//           justifyContent="flex-start"
//           p={4}
//           borderBottomColor="gray"
//           borderBottomWidth="1px"
//         >
//           <Text fontSize="md" color="#E7E9EA">
//             MATCH INFORMATION
//           </Text>
//         </Flex>

//         <Flex flexDir="column" p={4}>
//           <Flex flexDir="row" alignItems="center" mb={3}>
//             <IoFootballOutline size={24} color="#E7E9EA" />
//             <Flex flexDir="column" alignItems="flex-start" pl={5}>
//               <Text fontSize="md" color="#E7E9EA">
//                 Competition
//               </Text>
//               <Text fontSize="md" color="gray">
//                 Rated
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex flexDir="row" alignItems="center" mb={3}>
//             <IoPeopleOutline size={24} color="#E7E9EA" />
//             <Flex flexDir="column" alignItems="flex-start" pl={5}>
//               <Text fontSize="md" color="#E7E9EA">
//                 Format
//               </Text>
//               <Text fontSize="md" color="gray">
//                 {/* {match?.format} */}
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex flexDir="row" alignItems="center" mb={3}>
//             <IoTimeOutline size={24} color="#E7E9EA" />
//             <Flex flexDir="column" alignItems="flex-start" pl={5}>
//               <Text fontSize="md" color="#E7E9EA">
//                 Kick-off
//               </Text>
//               <Text fontSize="md" color="gray">
//                 {/* {match?.date} at {match?.time} */}
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex flexDir="row" alignItems="center" mb={3}>
//             <IoLocationOutline size={24} color="#E7E9EA" />
//             <Flex flexDir="column" alignItems="flex-start" pl={5}>
//               <Text fontSize="md" color="#E7E9EA">
//                 Location
//               </Text>
//               <Text fontSize="md" color="gray">
//                 {/* {match?.location} */}
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex flexDir="row" alignItems="center" mb={3}>
//             <GiWhistle size={24} color="#E7E9EA" />
//             <Flex flexDir="column" alignItems="flex-start" pl={5}>
//               <Text fontSize="md" color="#E7E9EA">
//                 Refree
//               </Text>
//               <Text fontSize="md" color="gray">
//                 {/* {match?.match_official || "TBD"} */}
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex justifyContent="center"><Button>Join</Button></Flex>
//         </Flex>
//       </Box>
//     </Box>

//   )
// }

// export default Tournament