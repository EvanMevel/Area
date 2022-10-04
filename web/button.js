import { Flex, useColorModeValue, IconButton, Link} from '@chakra-ui/react'

export const Button = () => {
  const color = useColorModeValue("gray.500", "gray.800")

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bg={color}
      h="24"
      w="100%"
      px="8"
    >
        <Link href="/" >
            <IconButton bg="black" color="white" _hover={{bg:"black", transform: "scale(1.02)"}} p="2" w="90px" h="75px"/>
        </Link>
    </Flex>
  )
}