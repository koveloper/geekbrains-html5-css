let pageWrapper = (function() {

    let headerCarouselPosition = 0;
    let presentationPauseCallback = undefined;

    return {
        header: {
            setCarouselPosition: (position) => {
                let carouselItems = document.getElementsByClassName("header-switcher-item");
                let dots = document.getElementsByClassName("header-dots-item");
                let targetPosition = undefined;
                if(position === undefined) {
                   targetPosition =  (headerCarouselPosition + 1) % carouselItems.length;
                } else if(position < 0) {
                    targetPosition = headerCarouselPosition - 1;
                    targetPosition = targetPosition < 0 ? (carouselItems.length - 1) : targetPosition;
                } else {
                    targetPosition = position % carouselItems.length;
                }
                let toggleClass = undefined;
                for(let i = 0; i < carouselItems.length; i++) {
                    if(carouselItems[i].classList.contains("carousel-position-" + i)) {
                        toggleClass = "carousel-position-" + i;
                        break;
                    }
                }
                if(toggleClass && targetPosition !== undefined) {
                    for(let i = 0; i < carouselItems.length; i++) {
                        carouselItems[i].classList.remove(toggleClass);
                        carouselItems[i].classList.add("carousel-position-" + targetPosition);
                        dots[i].classList.remove("header-dots-item-selected");
                    }
                    dots[targetPosition].classList.add("header-dots-item-selected");
                    headerCarouselPosition = targetPosition;
                }
            }
        },
        presentation: {
            play: () => {
                let controls = document.getElementsByClassName("presentation-controls")[0];
                let timestamp = document.getElementsByClassName("presentation-timestamp")[0];
                let video = document.getElementsByClassName("presentation-video")[0];
                if(presentationPauseCallback === undefined) {
                    presentationPauseCallback = () => {
                        controls.classList.remove("presentation-controls-hided");
                        let minutes = Math.floor(video.currentTime / 60);
                        let seconds = Math.floor(video.currentTime % 60);
                        timestamp.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":"  + (seconds < 10 ? "0" : "") + seconds;
                    };
                    video.addEventListener("pause", presentationPauseCallback);
                }
                controls.classList.add("presentation-controls-hided");
                video.play();
            }
        }
    };
})();