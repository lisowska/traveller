import React, { FC } from 'react';

import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Props = {
  visited?: boolean;
};

export const InfoComponent: FC<Props> = ({ visited }) => {
  return (
    <Box
      width={400}
      height={200}
      padding={15}
      background="#002945"
      borderRadius={4}
      color="white"
    >
      {' '}
      <Text paddingTop={5} fontSize={18}>
        {visited
          ? `You don't have any cities on visit list yet`
          : `You don't have any cities on wishlist yet`}
      </Text>
      <Button
        as={Link}
        to="/"
        marginTop={10}
        width={60}
        backgroundColor="#00e3ff"
      >
        Get started
      </Button>
    </Box>
  );
};
