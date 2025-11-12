import { useState, useEffect, useRef } from 'react';
import { Sparkle, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/FAQ.css';

const FAQItem = ({ number, question, answer, isOpen, onClick, itemId }) => {
  const contentRef = useRef(null);

  const handleClick = () => {
    onClick(itemId);
  };

  return (
    <div 
      className="faq-item"
      data-state={isOpen ? "open" : "closed"} 
    >
      <h3 className="flex">
        <button 
          type="button"
          aria-expanded={isOpen} 
          className="faq-button"
          onClick={handleClick}
        >
          <span className="faq-number">{number}</span>
          {question}
          <ChevronDown className={`chevron ${isOpen ? 'rotate' : ''}`} size={16} />
        </button>
      </h3>
      <div 
        ref={contentRef}
        className={`faq-content-wrapper ${isOpen ? 'open' : ''}`}
      >
        <div className={`faq-content ${isOpen ? 'open' : ''}`}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
FAQItem.propTypes = {
  number: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  itemId: PropTypes.number.isRequired
};

const FAQ = () => {
  // State to track which FAQ item is currently open (null means all closed)
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      number: "01",
      question: "What is your current role?",
      answer: "UI/UX Designer & Frontend Developer passionate about creating intuitive and visually appealing web experiences. As an Informatics student at UII, I combine design thinking with technical skills to build modern web applications. Currently building my portfolio through freelance projects and collaborative work."
    },
    {
      number: "02",
      question: "How much does it cost for a high performing website?",
      answer: "Pricing is flexible and varies by project scope. As I'm building my portfolio, I'm open to discussing rates that work for both of us. Let's connect to talk about your specific needs!"
    },
    {
      number: "03",
      question: "How long will the work take from start to finish?",
      answer: "2-4 weeks for simple websites, 2-3 months for complex applications. Timeline varies based on project scope."
    },
    {
      number: "04",
      question: "Are you available for full-time work?",
      answer: "Currently pursuing my degree through a double-degree program (UII & Nanjing Xiaozhuang University). I'm available for freelance projects and part-time collaborations. Open to discussing internship opportunities that fit my schedule."
    }
  ];

  // Toggle function that ensures only one item can be open at a time
  const toggleItem = (itemId) => {
    if (openItem === itemId) {
      // If clicking the currently open item, close it
      setOpenItem(null);
    } else {
      // Otherwise, open the clicked item (and close any previously open item)
      setOpenItem(itemId);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true
    });
  }, []);

  return (
    <section className="faq-section">
      <div className="faq-header">
        <div className="faq-title-container">
          <Sparkle className="faq-icon" size={18} />
          <p className="faq-subtitle text-gradient">FAQs</p>
        </div>
        <h2 role="heading" className="faq-heading">
          <span className="heading-text">
            <span className="heading-char">H</span>
            <span className="heading-char">a</span>
            <span className="heading-char">v</span>
            <span className="heading-char">e</span>
          </span>
          <span className="heading-text">
            <span className="heading-char">Q</span>
            <span className="heading-char">u</span>
            <span className="heading-char">e</span>
            <span className="heading-char">s</span>
            <span className="heading-char">t</span>
            <span className="heading-char">i</span>
            <span className="heading-char">o</span>
            <span className="heading-char">n</span>
            <span className="heading-char">s</span>
            <span className="heading-char">?</span>
          </span>
        </h2>
      </div>
      <div className="faq-content-container">
        {faqData.map((faq, index) => (
          <span 
            key={index}
            data-aos="fade-up" 
            data-aos-duration="300" 
            data-aos-delay={index * 150} 
            className="aos-init"
          >
            <FAQItem 
              number={faq.number} 
              question={faq.question} 
              answer={faq.answer}
              isOpen={openItem === index}
              onClick={toggleItem}
              itemId={index}
            />
          </span>
        ))}
      </div>
    </section>
  );
};

export default FAQ;