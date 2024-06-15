import { useEffect } from 'react';
import { PropTypes } from 'prop-types'

export default function HorizontalChevron({ children, page }) {
  HorizontalChevron.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    page: PropTypes.object
  };

  useEffect(() => {
    const scrollableContainer = document.querySelector(`.${page.classname}`);
    const leftChevron = scrollableContainer.querySelector('.left-chevron');
    const rightChevron = scrollableContainer.querySelector('.right-chevron');
  
    const updateChevronVisibility = () => {
      const isScrolledLeft = scrollableContainer.scrollLeft > 0;
      const isScrolledRight = scrollableContainer.scrollWidth - scrollableContainer.scrollLeft - scrollableContainer.clientWidth <= 1; // Adjust this threshold as needed
      leftChevron.classList.toggle('hidden', !isScrolledLeft);
      rightChevron.classList.toggle('hidden', isScrolledRight);
    };
  
    updateChevronVisibility(); 
  
    const handleScroll = () => {
      updateChevronVisibility();
    };
  
    scrollableContainer.addEventListener('scroll', handleScroll);
    return () => scrollableContainer.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className={`${page.classname}`}>
      <div className={`chevron left-chevron ${page.name === 'profile' ? 'profile-chevron' : ''}`}>
        <span className="material-symbols-outlined">
        arrow_back_ios
        </span>
      </div>
        { children }
      <div className={`chevron right-chevron ${page.name === 'profile' ? 'profile-chevron' : ''}`}>
        <span className="material-symbols-outlined">
        arrow_forward_ios
        </span>
      </div>
    </div>
  )
}