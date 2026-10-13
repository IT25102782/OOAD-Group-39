import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

// Category / UI icons
import deliveryIcon from "../assets/icons/delivery.png";
import vegetableIcon from "../assets/icons/vegetables.png";
import bakeryIcon from "../assets/icons/bakery.png";
import riceIcon from "../assets/icons/rice.png";
import fruitIcon from "../assets/icons/fruits.png";
import beveragesIcon from "../assets/icons/beverages.png";
import dairyIcon from "../assets/icons/dairy.png";

// Existing feature icons
import fresh from "../assets/fresh.png";
import cheap from "../assets/cheap.png";
import fastdelivery from "../assets/fastdelivery.png";

import "./Home.css";


function Home() {

    // =====================================
    // REVIEW STATES
    // =====================================

    const [reviews, setReviews] =
        useState([]);

    const [activeReview, setActiveReview] =
        useState(0);


    // =====================================
    // AOS INITIALIZE
    // =====================================

    useEffect(() => {

        AOS.init({
            duration: 800,
            once: true,
            offset: 60,
            easing: "ease-out"
        });

    }, []);


    // =====================================
    // LOAD CUSTOMER REVIEWS
    // =====================================

    useEffect(() => {

        axios
            .get(
                "http://localhost:8080/api/reviews"
            )
            .then((response) => {

                const reviewData =
                    Array.isArray(response.data)
                        ? response.data
                        : [];

                setReviews(
                    reviewData
                );

                setActiveReview(0);

            })
            .catch((error) => {

                console.error(
                    "Unable to load customer reviews:",
                    error
                );

                setReviews([]);

            });

    }, []);


    // =====================================
    // AUTOMATIC REVIEW SLIDER
    // =====================================

    useEffect(() => {

        if (reviews.length <= 1) {
            return;
        }

        const interval =
            setInterval(() => {

                setActiveReview(
                    (currentReview) =>
                        (
                            currentReview + 1
                        ) % reviews.length
                );

            }, 4500);


        return () => {

            clearInterval(
                interval
            );

        };

    }, [reviews]);


    // =====================================
    // CATEGORIES
    // =====================================

    const categories = [
        {
            icon: vegetableIcon,
            name: "Vegetables"
        },
        {
            icon: fruitIcon,
            name: "Fruits"
        },
        {
            icon: dairyIcon,
            name: "Dairy"
        },
        {
            icon: riceIcon,
            name: "Rice & Grains"
        },
        {
            icon: bakeryIcon,
            name: "Bakery"
        },
        {
            icon: beveragesIcon,
            name: "Beverages"
        }
    ];


    // =====================================
    // FORMAT REVIEW DATE
    // =====================================

    const formatReviewDate = (date) => {

        if (!date) {
            return "";
        }

        return new Date(date)
            .toLocaleDateString(
                undefined,
                {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                }
            );
    };


    return (

        <div className="home-page">


            {/* =====================================
                HERO SECTION
            ====================================== */}

            <section className="home-hero">

                <div
                    className="home-hero-content"
                    data-aos="fade-right"
                >

                    <div className="hero-badge">
                        Fresh • Local • Affordable
                    </div>


                    <span className="hero-eyebrow">
                        WELCOME TO UDAWATTA STORES
                    </span>


                    <h1>
                        Your Trusted Source
                        <br />

                        for

                        <span>
                            {" "}Fresh & Healthy{" "}
                        </span>

                        Foods
                    </h1>


                    <p>
                        Shop fresh groceries, vegetables,
                        fruits, dairy and everyday essentials
                        from the comfort of your home.
                    </p>


                    <div className="hero-actions">

                        <Link
                            to="/products"
                            className="primary-button"
                        >
                            Shop Now
                        </Link>


                        <a
                            href="#categories"
                            className="secondary-button"
                        >
                            Explore Categories
                        </a>

                    </div>


                    <div className="hero-statistics">

                        <div>

                            <strong>
                                100+
                            </strong>

                            <span>
                                Products
                            </span>

                        </div>


                        <div>

                            <strong>
                                Fresh
                            </strong>

                            <span>
                                Daily Stock
                            </span>

                        </div>


                        <div>

                            <strong>
                                Fast
                            </strong>

                            <span>
                                Delivery
                            </span>

                        </div>

                    </div>

                </div>


                {/* HERO IMAGE */}

                <div
                    className="home-hero-image-wrapper"
                    data-aos="fade-left"
                    data-aos-delay="150"
                >

                    <div className="home-hero-image">

                        <img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
                            alt="Fresh grocery store"
                        />

                    </div>


                    {/* DELIVERY FLOATING CARD */}

                    <div className="delivery-floating-card">

                        <div className="floating-icon">

                            <img
                                src={deliveryIcon}
                                alt="Fast Delivery"
                                className="floating-icon-image"
                            />

                        </div>


                        <div>

                            <strong>
                                Fast Delivery
                            </strong>

                            <p>
                                Fresh groceries to your door
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================
                CATEGORIES
            ====================================== */}

            <section
                className="home-categories"
                id="categories"
            >

                <div className="home-section-header">

                    <div>

                        <span className="section-label">
                            SHOP SMART
                        </span>

                        <h2>
                            Shop by Category
                        </h2>

                        <p>
                            Find everything you need for
                            your everyday shopping.
                        </p>

                    </div>


                    <Link
                        to="/products"
                        className="view-all"
                    >
                        View All →
                    </Link>

                </div>


                <div className="home-category-grid">

                    {categories.map(
                        (category, index) => (

                            <Link
                                to="/products"
                                className="home-category-card"
                                key={category.name}
                                data-aos="zoom-in"
                                data-aos-delay={
                                    index * 70
                                }
                            >

                                <div className="home-category-icon">

                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                    />

                                </div>


                                <h3>
                                    {category.name}
                                </h3>


                                <span>
                                    Shop Now →
                                </span>

                            </Link>

                        )
                    )}

                </div>

            </section>


            {/* =====================================
                PROMOTIONAL OFFERS
            ====================================== */}

            <section className="home-offers">

                <div
                    className="home-offer-card offer-green"
                    data-aos="fade-up"
                >

                    <span className="offer-label">
                        FREE DELIVERY
                    </span>

                    <h3>
                        Convenient Shopping
                        <br />
                        Delivered to You
                    </h3>

                    <p>
                        Fresh groceries delivered
                        directly to your doorstep.
                    </p>

                    <Link to="/products">
                        Shop Now →
                    </Link>

                </div>


                <div
                    className="home-offer-card offer-red"
                    data-aos="fade-up"
                    data-aos-delay="120"
                >

                    <span className="offer-label">
                        FRESH EVERYDAY
                    </span>

                    <h3>
                        Fresh Products
                        <br />
                        Every Day
                    </h3>

                    <p>
                        Quality products selected
                        carefully for your family.
                    </p>

                    <Link to="/products">
                        Explore →
                    </Link>

                </div>


                <div
                    className="home-offer-card offer-yellow"
                    data-aos="fade-up"
                    data-aos-delay="240"
                >

                    <span className="offer-label">
                        GREAT VALUE
                    </span>

                    <h3>
                        Affordable Prices
                        <br />
                        Everyday
                    </h3>

                    <p>
                        Shop quality groceries at
                        reasonable prices.
                    </p>

                    <Link to="/products">
                        View Products →
                    </Link>

                </div>

            </section>


            {/* =====================================
                WHY CHOOSE US
            ====================================== */}

            <section className="home-features">

                <div
                    className="center-heading"
                    data-aos="fade-up"
                >

                    <span className="section-label">
                        WHY UDAWATTA?
                    </span>

                    <h2>
                        Why Choose Udawatta Stores?
                    </h2>

                    <p>
                        Shopping for your daily essentials
                        should be easy, affordable and reliable.
                    </p>

                </div>


                <div className="home-features-grid">


                    {/* FRESH */}

                    <div
                        className="home-feature-card"
                        data-aos="fade-up"
                    >

                        <div className="feature-image-box">

                            <img
                                src={fresh}
                                alt="Fresh products"
                            />

                        </div>

                        <h3>
                            Fresh Products
                        </h3>

                        <p>
                            Fresh and quality products
                            selected carefully for your family.
                        </p>

                    </div>


                    {/* DELIVERY */}

                    <div
                        className="home-feature-card"
                        data-aos="fade-up"
                        data-aos-delay="120"
                    >

                        <div className="feature-image-box">

                            <img
                                src={fastdelivery}
                                alt="Fast delivery"
                            />

                        </div>

                        <h3>
                            Fast Delivery
                        </h3>

                        <p>
                            Get your groceries delivered
                            conveniently to your doorstep.
                        </p>

                    </div>


                    {/* AFFORDABLE */}

                    <div
                        className="home-feature-card"
                        data-aos="fade-up"
                        data-aos-delay="240"
                    >

                        <div className="feature-image-box">

                            <img
                                src={cheap}
                                alt="Affordable prices"
                            />

                        </div>

                        <h3>
                            Affordable Prices
                        </h3>

                        <p>
                            Enjoy quality groceries and
                            everyday essentials at good prices.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================
                CUSTOMER REVIEWS
            ====================================== */}

            {reviews.length > 0 && (

                <section className="home-reviews">

                    <div
                        className="center-heading"
                        data-aos="fade-up"
                    >

                        <span className="section-label">
                            CUSTOMER FEEDBACK
                        </span>

                        <h2>
                            What Our Customers Say
                        </h2>

                        <p>
                            Real experiences shared by
                            Udawatta Stores customers.
                        </p>

                    </div>


                    <div className="home-review-slider">

                        <article
                            key={
                                reviews[
                                    activeReview
                                    ].id
                            }
                            className={
                                reviews.length > 1
                                    ? "home-review-card home-review-card-animated"
                                    : "home-review-card"
                            }
                        >

                            <div className="home-review-top">

                                <div className="home-review-avatar">

                                    {reviews[
                                        activeReview
                                        ].customerName
                                        ? reviews[
                                            activeReview
                                            ].customerName
                                            .charAt(0)
                                            .toUpperCase()
                                        : "C"}

                                </div>


                                <div className="home-review-person">

                                    <strong>
                                        {
                                            reviews[
                                                activeReview
                                                ].customerName
                                        }
                                    </strong>

                                    <span>
                                        Verified Customer
                                    </span>

                                </div>


                                <div className="home-review-date">

                                    {formatReviewDate(
                                        reviews[
                                            activeReview
                                            ].createdAt
                                    )}

                                </div>

                            </div>


                            <div className="home-review-stars">

                                <span>

                                    {"★".repeat(
                                        Number(
                                            reviews[
                                                activeReview
                                                ].rating
                                        )
                                    )}

                                </span>


                                <span className="home-review-empty-stars">

                                    {"★".repeat(
                                        5 -
                                        Number(
                                            reviews[
                                                activeReview
                                                ].rating
                                        )
                                    )}

                                </span>

                            </div>


                            <blockquote>

                                "
                                {
                                    reviews[
                                        activeReview
                                        ].comment
                                }
                                "

                            </blockquote>


                            <div className="home-reviewed-product">

                                Reviewed product:

                                <strong>
                                    {" "}
                                    {
                                        reviews[
                                            activeReview
                                            ].productName
                                    }
                                </strong>

                            </div>

                        </article>

                    </div>


                    {/* SLIDER INDICATORS */}

                    {reviews.length > 1 && (

                        <div className="home-review-dots">

                            {reviews.map(
                                (review, index) => (

                                    <button
                                        key={review.id}
                                        type="button"
                                        className={
                                            index === activeReview
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setActiveReview(
                                                index
                                            )
                                        }
                                        aria-label={
                                            `Show review ${index + 1}`
                                        }
                                    >
                                    </button>

                                )
                            )}

                        </div>

                    )}

                </section>

            )}


            {/* =====================================
                DELIVERY CTA
            ====================================== */}

            <section
                className="delivery-banner"
                data-aos="zoom-in"
            >

                <div>

                    <span>
                        READY TO SHOP?
                    </span>

                    <h2>
                        Fresh groceries are
                        only a few clicks away.
                    </h2>

                    <p>
                        Browse our products and fill
                        your cart with everyday essentials.
                    </p>

                </div>


                <Link
                    to="/products"
                    className="delivery-shop-button"
                >
                    Start Shopping
                </Link>

            </section>


            {/* =====================================
                FOOTER
            ====================================== */}

            <footer className="home-footer">

                <div className="home-footer-content">


                    <div className="footer-about">

                        <h3>
                            Udawatta Stores
                        </h3>

                        <p>
                            Your trusted online grocery store,
                            bringing fresh and quality products
                            directly to your doorstep.
                        </p>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Quick Links
                        </h4>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/products">
                            Products
                        </Link>

                        <Link to="/cart">
                            My Cart
                        </Link>

                        <Link to="/my-orders">
                            My Orders
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Customer
                        </h4>

                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Create Account
                        </Link>

                        <Link to="/products">
                            Shop Products
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Contact Us
                        </h4>

                        <p>
                            No. 84, Mathugama Road
                        </p>

                        <p>
                            Agalawatta, Sri Lanka
                        </p>

                        <p>
                            +94 76 214 4708
                        </p>

                        <p>
                            support@udawattastores.com
                        </p>

                    </div>

                </div>


                <div className="home-footer-bottom">

                    <p>
                        © 2026 Udawatta Stores.
                        All rights reserved.
                    </p>

                </div>

            </footer>

        </div>

    );
}


export default Home;