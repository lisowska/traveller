import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import {
  Heading,
  ListItem,
  UnorderedList,
  VStack,
  Box,
} from '@chakra-ui/react';
import { InfoComponent } from './InfoComponent';
import { useQuery, gql } from '@apollo/client';

const VISITED_CITIE_QUERY = gql`
  query GetCity {
    cities {
      cities {
        country
        id
        name
        visited
      }
    }
  }
`;

export const Visited: FC = () => {
  const { data } = useQuery(VISITED_CITIE_QUERY);
  const citiesData = data && data?.cities?.cities;

  const [visit, SetVisit] = useState([]);

  useEffect(() => {
    SetVisit(citiesData);
  });

  const visitLista = visit && visit.find((item) => item['visited'] === true);

  return (
    <VStack
      cover="full"
      height="100vh"
      position="relative"
      width="100%"
      display="flex"
      _before={{
        content: '""',
        backgroundImage: 'imageCities.jpg',
        backgroundSize: 'cover',
        position: 'absolute',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        opacity: 0.6,
      }}
    >
      {' '}
      <Heading as="h1" position="relative" marginBottom={10}>
        VISITED LIST
      </Heading>
      <UnorderedList position="relative">
        {visit &&
          visit.length > 1 &&
          visit
            .filter((item) => item['visited'] === true)
            .map((item) => {
              return (
                <Box
                  display="grid"
                  gridGap={2}
                  grid-template-columns="repeat(auto-fit, minmax(15.625rem, 1fr))"
                  margin-top={10}
                >
                  <ListItem
                    key={item['id']}
                    listStyleType="none"
                    marginRight="5"
                    marginBlockStart="5"
                    textAlign="center"
                    color="#003357"
                    fontWeight="600"
                    fontSize="30"
                    width={300}
                    borderRadius={12}
                    backgroundColor="blue"
                    top={50}
                    boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                    display="flex"
                    flexDirection="row"
                    background="white"
                    padding={15}
                  >
                    <Box as="p" width={200} paddingRight={5}>
                      {item['name']}{' '}
                    </Box>
                    <Box as="p" width={200}>
                      {item['country']}
                    </Box>
                  </ListItem>
                </Box>
              );
            })}
        {visitLista === undefined && <InfoComponent visited={false} />}
      </UnorderedList>
    </VStack>
  );
};
