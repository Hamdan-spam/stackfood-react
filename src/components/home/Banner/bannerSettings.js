export const bannerSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 1450,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2.5,
                slidesToScroll: 3,
                infinite: false,
            },
        },
        {
            breakpoint: 850,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3,
                autoplay: true,
                // dots: true
            },
        },
        {
            breakpoint: 790,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3,
                infinite: false,
                dots: true,
                autoplay: true,
            },
        },

        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1.5,
                slidesToScroll: 2,
                dots: true,
                autoplay: true,
            },
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                dots: true,
                autoplay: true,
            },
        },
    ],
}
