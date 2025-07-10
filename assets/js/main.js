document.addEventListener('DOMContentLoaded', function() {
    // Professional scroll progress indicator
    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress);
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Demo calculator functionality
    const loadSlider = document.getElementById('load');
    const pvSlider = document.getElementById('pv-capacity');
    const batterySlider = document.getElementById('battery-capacity');
    const locationSelect = document.getElementById('location');
    const calculateBtn = document.getElementById('calculate-btn');
    
    const loadValue = document.getElementById('load-value');
    const pvValue = document.getElementById('pv-value');
    const batteryValue = document.getElementById('battery-value');
    
    // Update slider values
    if (loadSlider && loadValue) {
        loadSlider.addEventListener('input', function() {
            loadValue.textContent = this.value + ' kW';
        });
    }
    
    if (pvSlider && pvValue) {
        pvSlider.addEventListener('input', function() {
            pvValue.textContent = this.value + ' kW';
        });
    }
    
    if (batterySlider && batteryValue) {
        batterySlider.addEventListener('input', function() {
            batteryValue.textContent = this.value + ' kWh';
        });
    }
    
    // Calculate optimization results
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const load = parseInt(loadSlider.value);
            const pv = parseInt(pvSlider.value);
            const battery = parseInt(batterySlider.value);
            const location = locationSelect.value;
            
            // Simulate calculation with realistic values
            const results = calculateOptimization(load, pv, battery, location);
            
            // Update results display
            document.getElementById('lcoe-result').textContent = '$' + results.lcoe.toFixed(3) + '/kWh';
            document.getElementById('npc-result').textContent = '$' + (results.npc / 1000000).toFixed(1) + 'M';
            document.getElementById('renewable-result').textContent = results.renewable.toFixed(0) + '%';
            document.getElementById('co2-result').textContent = results.co2.toFixed(0) + ' tons/year';
            
            // Update chart
            updateResultsChart(results);
            
            // Add loading state
            calculateBtn.textContent = 'Calculating...';
            calculateBtn.disabled = true;
            
            setTimeout(() => {
                calculateBtn.textContent = 'Calculate Optimization';
                calculateBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Initialize chart
    let resultsChart = null;
    const chartCanvas = document.getElementById('results-chart');
    
    if (chartCanvas && typeof Chart !== 'undefined') {
        const ctx = chartCanvas.getContext('2d');
        
        resultsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Solar PV', 'Wind', 'Battery', 'Grid/Genset'],
                datasets: [{
                    data: [45, 15, 25, 15],
                    backgroundColor: [
                        '#f59e0b',
                        '#10b981',
                        '#3b82f6',
                        '#64748b'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step-card, .metric').forEach(el => {
        observer.observe(el);
    });
});

// Optimization calculation function
function calculateOptimization(load, pv, battery, location) {
    // Location-based solar multipliers
    const locationMultipliers = {
        'denver': 1.0,
        'phoenix': 1.3,
        'seattle': 0.7,
        'miami': 1.1
    };
    
    const solarMultiplier = locationMultipliers[location] || 1.0;
    
    // Calculate renewable fraction
    const pvGeneration = pv * solarMultiplier * 1460; // kWh/year (rough estimate)
    const totalDemand = load * 8760; // kWh/year
    const renewableFraction = Math.min((pvGeneration / totalDemand) * 100, 95);
    
    // Calculate LCOE (simplified model)
    const pvCost = pv * 1200; // $1200/kW
    const batteryCost = battery * 400; // $400/kWh
    const totalCapex = pvCost + batteryCost;
    const annualEnergy = Math.min(pvGeneration, totalDemand);
    const lcoe = (totalCapex * 0.08) / annualEnergy; // 8% discount rate
    
    // Calculate NPC (Net Present Cost)
    const npc = totalCapex + (load * 0.05 * 8760 * 15); // Include O&M costs
    
    // Calculate CO2 reduction
    const gridEmissionFactor = 0.4; // kg CO2/kWh
    const co2Reduction = (annualEnergy * renewableFraction / 100 * gridEmissionFactor) / 1000;
    
    return {
        lcoe: lcoe,
        npc: npc,
        renewable: renewableFraction,
        co2: co2Reduction
    };
}

// Update results chart
function updateResultsChart(results) {
    if (window.resultsChart) {
        const renewableShare = results.renewable;
        const gridShare = 100 - renewableShare;
        
        // Update chart data based on renewable fraction
        const solarShare = renewableShare * 0.7;
        const windShare = renewableShare * 0.1;
        const batteryShare = renewableShare * 0.2;
        
        window.resultsChart.data.datasets[0].data = [
            solarShare,
            windShare,
            batteryShare,
            gridShare
        ];
        
        window.resultsChart.update();
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading states for better UX
function showLoading(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Professional scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    document.body.style.setProperty('--scroll-progress', scrolled + '%');
    document.documentElement.style.setProperty('--scroll-width', scrolled + '%');
}

// Enhanced intersection observer for professional animations
const enhancedObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.feature-card, .metric, .step-card');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('fade-in-up');
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
});

// Observe all major sections for enhanced animations
document.querySelectorAll('.section, .hero, .metrics-banner').forEach(el => {
    enhancedObserver.observe(el);
});

// Professional typing effect for hero title
function typeWriterEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.borderRight = '2px solid var(--primary)';
    
    let i = 0;
    const typeSpeed = 50;
    
    function typeChar() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeChar, typeSpeed);
        } else {
            // Remove cursor after typing
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after a delay
    setTimeout(typeChar, 500);
}

// Enhanced parallax effect for hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Professional loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.classList.add('loading');
    
    // Remove loading class after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            body.classList.remove('loading');
        }, 300);
    });
}

// Initialize professional enhancements
addLoadingAnimation();
// typeWriterEffect(); // Uncomment if you want typing effect
addParallaxEffect();

// Export functions for external use
window.PyMicrogridWeb = {
    calculateOptimization,
    updateResultsChart,
    showLoading,
    hideLoading,
    updateScrollProgress
};