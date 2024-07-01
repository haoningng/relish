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
    const chevronContainer = document.querySelector(`.chevron-container`);
    const leftChevron = chevronContainer.querySelector('.left-chevron');
    const rightChevron = chevronContainer.querySelector('.right-chevron');
    const scrollableContainer = document.querySelector(`.${page.classname}`)
  
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
    <div className={`chevron-container ${page.name === 'profile' ? 'profile-chevron-container' : ''}`}>
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