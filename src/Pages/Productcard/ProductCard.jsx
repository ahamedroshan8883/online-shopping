import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import { Link } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import { Rate } from 'antd';
import { useDispatch } from 'react-redux';
import { addproducts } from '../../redux/cartRedux/cartSlice';

export default function ProductCard({ product }) {
  let dispatch = useDispatch();
  const handleAddcart = (product) => {
    dispatch(addproducts(product));
  };

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
      <CardOverflow>
        <AspectRatio 
          sx={{ 
            minWidth: '100%', 
            maxHeight: 200,
            '@media (min-width: 600px)': {
              maxHeight: 160,
            },
            '@media (min-width: 960px)': {
              maxHeight: 200,
            },
          }}
        >
          <img
            src={product.image}
            srcSet={product.image}
            loading="lazy"
            alt={product.title} 
            style={{ width: '100%', margin: '1rem 0' }}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent>
        <Typography level="body-xs" sx={{ fontSize: '0.75rem','@media (max-width: 600px)': {
              fontSize: '0.5rem',
            },'@media (max-width: 400px)': {
              fontSize: '0.35rem',
            }}}>{product.category}</Typography>
        <Typography sx={{ fontSize: '1rem', fontWeight: 'bold','@media (max-width: 600px)': {
              fontSize: '0.75rem',
            },'@media (max-width: 400px)': {
              fontSize: '0.5rem',
            }}}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </Typography>
        
        <Typography sx={{ 
          mt: 0.5,
          '@media (max-width: 600px)': {
            fontSize: '0.5rem', // Smaller font size for small screens
          },
          '@media (min-width: 600px)': {
            fontSize: '1rem', // Normal font size for medium screens
          },
          '@media (min-width: 960px)': {
            fontSize: '1.2rem', // Larger font size for larger screens
          },
      }}>
          <Rate style={{ fontSize: 'inherit' }} disabled defaultValue={product.rating.rate} />
        </Typography>
        <Typography
          level="title-lg"
          sx={{ 
            mt: 1, 
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            '@media (max-width: 600px)': {
            fontSize: '0.75rem',
          },'@media (max-width: 400px)': {
            fontSize: '0.5rem',
          }}}
          endDecorator={
            <Chip component="span"  size="sm" variant="soft" color="success" sx={{'@media (max-width: 600px)': {
              fontSize: '0.3rem',
            }}}>
              Lowest price
            </Chip>
          }
        >
          {product.price}$
        </Typography>
        <Typography level="body-sm" sx={{ fontSize: '0.875rem',
            '@media (max-width: 600px)': {
            fontSize: '0.5rem',
          },
          '@media (max-width: 400px)': {
          fontSize: '0.3rem',
          }}}>
          (Only <b>{Math.floor(Math.random() * 20).toString()}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow 
        sx={{ 
          mt: 'auto', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
      >
        <Button 
          variant="solid" 
          color="danger" 
          size="lg" 
          sx={{ 
            width: '100%', 
            '@media (max-width: 600px)': {
              fontSize: 'small',
            },
            '@media (max-width: 400px)': {
              fontSize: 'x-small',
            },
          }}
          onClick={() => handleAddcart(product)}
        >
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
