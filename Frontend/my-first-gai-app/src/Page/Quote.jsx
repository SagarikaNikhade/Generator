import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Container,
  Grid,
  GridItem,
  Select,
  Spinner,
} from "@chakra-ui/react";

const image=`https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg`

const Quote = () => {
  const [type, setType] = useState("quote");
  const [quote, setQuote] = useState("");
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handlegenerateQuote = () => {
    setLoading(true);
    fetch(`https://gifted-erin-kitten.cyclic.app/create?type=${type}`,
      {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ keyword: `on ${userInput}` }),
      }
    ).then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setQuote(res);
      });
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <Box bgImage={`url(${image})`} minHeight="100vh" py={8}>
      <Container maxW="xl">
        <Box
          borderRadius="lg"
          p={8}
          boxShadow="md"
          textAlign="center"
        >
          <Heading as="h2" mb={8} color="pink.500">
            {type === "quote" ? "Quote" : "Story"} Generator
          </Heading>
          <Grid templateColumns="1fr" gap={4} color="pink.500">
            <Select onChange={(e) => setType(e.target.value)}>
              <option value="quote">Quote</option>
              <option value="story">Story</option>
            </Select>
            <GridItem>
              <Input
                placeholder="Enter your input..."
                value={userInput}
                onChange={handleUserInput}
                bg="gray.200"
                color="gray.800"
                borderRadius="md"
                p={4}
                _placeholder={{ color: "gray.400" }}
              />
            </GridItem>
            <GridItem>
              <Button
                colorScheme="pink"
                onClick={handlegenerateQuote}
                w="100%"
                _hover={{ bg: "purple.600" }}
              >
                Generate {type === "quote" ? "Quote" : "Story"}
              </Button>
            </GridItem>
            <GridItem>
              {/* Display the Spinner component when loading */}
              {loading ? <Spinner size="xl" color="purple.500" /> : null}
            </GridItem>
            {quote && (
              <GridItem>
                <Box bg="gray.200" borderRadius="md" p={4}>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Generated {type === "quote" ? "Quote" : "Story"}:
                  </Text>
                  {loading ? (
                    // Display the Spinner while loading
                    <Spinner size="md" color="gray.500" />
                  ) : typeof quote === "object" ? (
                    quote.map((el, i) => (
                      <Box key={i}>
                        <Text fontSize="lg">{el}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text fontSize="lg">{quote}</Text>
                  )}
                </Box>
              </GridItem>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Quote;
