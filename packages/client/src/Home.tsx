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
} from '@chakra-ui/react';

import ReactLoading from 'react-loading';

import { Search2Icon } from '@chakra-ui/icons';
import { useQuery, gql, useMutation } from '@apollo/client';

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
  const [visited, setVisited] = useState();

  useEffect(() => {
    setAPIData(citiesData);
  });

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue: any) => {
    if (searchInput !== '') {
      console.log('aniaa');
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join('')
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    }

    // else {
    //   setFilteredResults(APIData);
    // }
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
        <UnorderedList>
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
                      color="#003357"
                      fontWeight="600"
                      fontSize="30"
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
                          const result = await updateCity({
                            variables: {
                              input: {
                                id: item['id'],
                                visited: true,
                              },
                            },
                          });
                          return result;
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
                      color="#003357"
                      background="#50e3c1"
                      minWidth="160"
                      cursor="pointer"
                      onClick={() =>
                        updateCity({
                          variables: {
                            input: {
                              id: item['id'],
                              wishlist: true,
                            },
                          },
                        })
                      }
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

        <div className="container">
          <div className="user-list"></div>
        </div>
      </Container>
    </VStack>
  );
};

{
  /* <Button
                      padding="5"
                      color="#003357"
                      background="#50e3c1"
                      minWidth="160"
                      cursor="pointer"
                      onClick={() =>
                        updateCity({
                          variables: {
                            input: {
                              id: item['id'],
                              wishlist: true,
                            },
                          },
                        })
                      }
                    ></Button> */
}
