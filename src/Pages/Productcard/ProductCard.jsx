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

export default function ProductCard({product}) {
  let dispatch = useDispatch();
  const handleAddcart = (product)=>{
    dispatch(addproducts(product));
  }
  return (<>
      <Card sx={{ width: 200, height:420, maxWidth: '100%', boxShadow: 'lg' }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 100 }}>
          <img
            src={product.
              image}
              srcSet={product.image}
            loading="lazy"
            alt="" 
            style={{width:"11rem",margin:"1rem"}}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent>
        <Typography level="body-xs">{product.category}</Typography>
        <Typography >
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </Typography>
        
        <Typography>
          <Rate disabled defaultValue={product.rating.rate} />
        </Typography>
        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              Lowest price
            </Chip>
          }
        >
          {product.price}$
        </Typography>
        <Typography level="body-sm">
          (Only <b>{Math.floor(Math.random()*20).toString()}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="danger" size="lg" onClick={()=>handleAddcart(product)}>
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  </>);
}