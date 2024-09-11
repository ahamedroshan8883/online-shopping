import React from "react";
import { Skeleton, Card, CardContent, Typography, Button, Chip, Box } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        minWidth: 100,
        maxWidth: 320, 
        height: 'auto', 
        boxShadow: 'lg', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        padding: '1rem',
        '@media (min-width: 770px)': {
          maxWidth: 120,
        },
        '@media (min-width: 960px)': {
          maxWidth: 220,
        },
      }}
    >
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={200}
        sx={{ 
          '@media (min-width: 600px)': { maxHeight: 160 }, 
          '@media (min-width: 960px)': { maxHeight: 200 } 
        }}
      />

      <CardContent>
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="50%" height={20} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton variant="rectangular" width={50} height={25} />
        </Box>
        <Skeleton variant="text" width="50%" height={20} />
      </CardContent>

      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton variant="rectangular" width="100%" height={45} />
      </Box>
    </Card>
  );
}

export default ProductCardSkeleton;