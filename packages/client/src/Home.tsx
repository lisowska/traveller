import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  ListItem,
  UnorderedList,
  Button,
  useToast,
} from '@chakra-ui/react';

import ReactLoading from 'react-loading';

import { Search2Icon } from '@chakra-ui/icons';
import { useQuery, gql, useMutation } from '@apollo/client';

import { InfoComponent } from './InfoComponent';

const CITY_QUERY = gql`
  query GetCity {
    cities {
      cities {
        country
        name
        id
        visited
        wishlist
      }
    }
  }
`;

const UPDATE_CITY = gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      visited
      wishlist
    }
  }
`;

export const Home: FunctionComponent = () => {
  const { loading, data } = useQuery(CITY_QUERY, {
    errorPolicy: 'all',
  });

  const [updateCity] = useMutation(UPDATE_CITY);

  // if (loading) {
  //   return <ReactLoading height={667} width={375} />;
  // }
  const citiesData = data && data?.cities?.cities;

  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    setAPIData(citiesData);
  });

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const [noCity, setNoCity] = useState<Boolean>(false);

  const toast = useToast();

  const searchItems = (searchValue: any) => {
    if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredResults(filteredData);

      if (filteredData && filteredData.length === 0) {
        setNoCity(true);
      } else {
        setNoCity(false);
      }
    }

    setSearchInput(searchValue);
  };

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    searchItems(inputValue);
  }, []);

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input
            placeholder="Search city"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <InputRightElement
            children={<IconButton aria-label="" icon={<Search2Icon />} />}
            onClick={() => searchItems(inputValue)}
          />
        </InputGroup>
        <UnorderedList backgroundColor="#002945" height="100%" padding={10}>
          {searchInput && searchInput.length > 1
            ? filteredResults.map((item) => {
                return (
                  <>
                    <ListItem
                      key={item['id']}
                      listStyleType="none"
                      padding="1"
                      marginRight="5"
                      marginBlockStart="5"
                      textAlign="center"
                      fontWeight="600"
                      fontSize="30"
                      color="white"
                      paddingBottom={5}
                    >
                      {item['name']}
                    </ListItem>
                    <Button
                      padding="5"
                      marginRight="5"
                      marginLeft="5"
                      color="#003357"
                      background="#50e3c1"
                      minWidth="160"
                      cursor="pointer"
                      onClick={async (e: React.MouseEvent) => {
                        e.preventDefault();
                        try {
                          await updateCity({
                            variables: {
                              input: {
                                id: item['id'],
                                visited: true,
                              },
                            },
                          });
                          const successToast = () =>
                            toast({
                              title: 'City added.',
                              description: `We've added ${item['name']} to your visit list.`,
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                            });
                          return successToast();
                        } catch (error) {
                          throw error;
                        }
                      }}
                    >
                      {!item['visited']
                        ? 'Add city to visit list'
                        : ' Already visited'}
                    </Button>
                    <Button
                      padding="5"
                      marginRight="5"
                      marginLeft="5"
                      color="#003357"
                      background="#50e3c1"
                      minWidth="160"
                      cursor="pointer"
                      onClick={async (e: React.MouseEvent) => {
                        e.preventDefault();
                        try {
                          await updateCity({
                            variables: {
                              input: {
                                id: item['id'],
                                wishlist: true,
                              },
                            },
                          });

                          const successToast = () =>
                            toast({
                              title: 'City added.',
                              description: `We've added ${item['name']} to your wish list.`,
                              status: 'success',
                              duration: 9000,
                              isClosable: true,
                            });
                          return successToast();
                        } catch (error) {
                          throw error;
                        }
                      }}
                    >
                      {!item['wishlist']
                        ? 'Add city to wish list'
                        : 'Added to wishList'}
                    </Button>
                  </>
                );
              })
            : ''}
        </UnorderedList>
        {noCity && (
          <InfoComponent description="Unfortunately, we don't have this city in our base. Try with another" />
        )}
      </Container>
    </VStack>
  );
};
