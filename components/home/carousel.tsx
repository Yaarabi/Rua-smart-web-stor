"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Grid } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../card";

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: string;
    images: string;
    rating: number;
    createdAt: Date;
    quantity: number;
}

interface ProductPerformance {
    _id: string;
    name: string;
    totalQuantitySold: number;
    totalRevenue: number;
}

export default function Carousel() {
    const [products, setProducts] = useState<Product[]>([]);

    function formatDate(date: Date): string {
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
    }

    const dateTo = new Date();
    const dateFrom = new Date();
    dateFrom.setDate(dateTo.getDate() - 30);

    const formattedFrom = formatDate(dateFrom);
    const formattedTo = formatDate(dateTo);
    const url = `/api/analytics/product?dateFrom=${formattedFrom}&dateTo=${formattedTo}`;

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const perfRes = await fetch(url);
            const perfData: ProductPerformance[] = await perfRes.json();

            const topIds = perfData.map((p) => p._id);

            const prodRes = await fetch("/api/products");
            const prodData: { products: Product[] } = await prodRes.json();

            const matchedProducts = topIds
            .map((id) => prodData.products.find((p) => p._id === id))
            .filter((p): p is Product => !!p);

            setProducts(matchedProducts);
        } catch (err) {
            console.error("Failed to load carousel products", err);
        }
        };

        fetchProducts();
    }, [url]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const slides = [];
    for (let i = 0; i < products.length; i += 3) {
        slides.push(products.slice(i, i + 3));
    }

    return (
        <Box sx={{ maxWidth: "1400px", mx: "auto", py: 4, px: 2 }}>
        <Typography
            variant="h5"
            sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "2rem" },
            }}
        >
            Top Performing Products
        </Typography>

        <Slider {...settings}>
            {slides.map((group, index) => (
            <Box key={index} sx={{ px: { xs: 1, sm: 2 } }}>
                <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                justifyContent="center"
                alignItems="stretch"
                >
                {group.map((product) => (
                    <div
                    key={product._id}
                    className=" max-w-[320px]  flex justify-center p-2 box-border"
                    >

                        <Card product={product} />
                    </div>
                    
                ))}
                </Grid>
            </Box>
            ))}
        </Slider>
        </Box>
    );
}
