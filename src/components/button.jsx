/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section with ID "counter",
 * with a small offset from the top for better visual placement.
 */

const Button = ({ text, className, id }) => {
<<<<<<< HEAD
    return (
        <a
            onClick={(e) => {
                e.preventDefault(); // Stop the link from jumping instantly

                const target = document.getElementById("counter"); // Find the section with ID "counter"


                if (target && id) {
                    const offset = window.innerHeight * 0.15; // Leave a bit of space at the top

                    // Calculate how far down the page we need to scroll
                    const top =
                        target.getBoundingClientRect().top + window.pageYOffset - offset;

                    // Scroll smoothly to that position
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }}
            className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
=======
    const handleClick = (e) => {
        e.preventDefault();

        if (!id) return;

        const target = document.getElementById(id);
        if (!target) return;

        const offset = window.innerHeight * 0.15;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={`${className ?? ""} cta-wrapper bg-transparent border-0 p-0`}
            aria-label={text}
>>>>>>> Added new
        >
            <div className="cta-button group">
                <div className="bg-circle" />
                <p className="text">{text}</p>
                <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                </div>
            </div>
<<<<<<< HEAD
        </a>
=======
        </button>
>>>>>>> Added new
    );
};

export default Button;
