// src/pages/Projects.jsx
import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FocusCards } from "../components/focus-cards";
import { focusCardsData } from "../utils/imageData";
import ShinyText from '../components/ShinyText';
import ScrollFadeOverlay from '../components/ScrollFadeOverlay';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import JourneySection from '../components/JourneySection';


function Projects() {
    // State untuk kategori yang aktif dan search query
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique categories dari data dan tambahkan "All"
    const categories = useMemo(() => {
      const uniqueCategories = [...new Set(focusCardsData.map(project => project.category))];
      return ['All', ...uniqueCategories];
    }, []);

    // Filter projects berdasarkan kategori dan search query
    const filteredProjects = useMemo(() => {
      let filtered = focusCardsData;

      // Filter by category
      if (activeCategory !== 'All') {
        filtered = filtered.filter(project => project.category === activeCategory);
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(project =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          project.technologies.some(tech => tech.toLowerCase().includes(query))
        );
      }

      return filtered;
    }, [activeCategory, searchQuery]);

    // Handler untuk mengubah kategori
    const handleCategoryChange = (category) => {
      setActiveCategory(category);
    };

    // Handler untuk mengubah search query
    const handleSearchChange = (query) => {
      setSearchQuery(query);
    };
    return (
      <div className="min-h-screen" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw', backgroundColor: 'var(--background)' }}>
        <ScrollFadeOverlay />
        <Navbar />

        <section className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24" style={{ textAlign: 'center', overflowX: 'hidden', width: '100%', paddingBottom: 'clamp(40px, 8vw, 80px)' }}>
          {/* Development Projects Section */}
          <div style={{ paddingTop: 'clamp(60px, 10vw, 80px)', marginBottom: 'clamp(80px, 12vw, 120px)' }}>
            <div style={{ marginBottom: 'clamp(24px, 4vw, 32px)' }}>
              <ShinyText text="</> Development Projects" />
            </div>

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search projects by name, category, or technology..."
            />

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Projects Grid */}
            <div style={{ paddingTop: '20px' }}>
              {filteredProjects.length > 0 ? (
                <FocusCards cards={filteredProjects} />
              ) : (
                <div style={{
                  color: 'var(--text-muted)',
                  fontSize: '16px',
                  padding: '60px 20px',
                  textAlign: 'center'
                }}>
                  No projects found matching your criteria. Try adjusting your search or filter.
                </div>
              )}
            </div>
          </div>

          {/* Photography & Design Section */}
          <JourneySection />

          {/* Footer with consistent spacing */}
          <div style={{ paddingTop: 'clamp(40px, 8vw, 60px)' }}>
            <Footer />
          </div>
        </section>
      </div>
    );
  }

  export default Projects;