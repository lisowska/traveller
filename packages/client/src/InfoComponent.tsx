import React, { FC } from 'react';

import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Props = {
  ctaBtn?: boolean;
  description?: string;
};

export const InfoComponent: FC<Props> = ({ ctaBtn, description }) => {
  return (
    <Box
      marginTop={5}
      width={400}
      height={200}
      padding={15}
      background="#002945"
      borderRadius={4}
      color="white"
      display="inline-block"
    >
      {' '}
      <Text paddingTop={5} fontSize={18}>
        {description}
      </Text>
      {ctaBtn && (
        <Button
          as={Link}
          to="/"
          marginTop={10}
          width={60}
          backgroundColor="#00e3ff"
        >
          Get started
        </Button>
      )}
    </Box>
  );
};
