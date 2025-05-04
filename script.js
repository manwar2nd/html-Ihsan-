// Display home section by default when page loads
document.addEventListener('DOMContentLoaded', function() {
    showSection('home');
    animateStats();
    const urlParams = new URLSearchParams(window.location.search);
    const program = urlParams.get('program');
    
    if (program) {
        const programTitle = document.getElementById('program-title');
        if (programTitle) {
            const programNames = {
                'education': 'Education Support Program',
                'healthcare': 'Healthcare Assistance Program',
                'housing': 'Housing Support Program',
                'food': 'Food Security Program',
                'outreach': 'Community Outreach Program',
                'emergency': 'Emergency Relief Program'
            };
            
            programTitle.textContent = programNames[program] || 'Program Details';
        }
    }
});

function animateStats() {
    const stats = {
        travelCount: 150,
        communityCount: 500,
        emergencyCount: 75
    };

    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;

    Object.keys(stats).forEach(statId => {
        const element = document.getElementById(statId);
        const target = stats[statId];
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, interval);
    });
}

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function showDonationModal() {
    const modal = document.getElementById('donationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Focus on the first input field
    setTimeout(() => {
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
    }, 100);
}

function hideModal() {
    const modal = document.getElementById('donationModal');
    modal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

function setAmount(amount) {
    const amountInput = document.getElementById('donationAmount');
    amountInput.value = amount;
    
    // Update active state of buttons
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === `$${amount}`) {
            btn.classList.add('active');
        }
    });
    
    // Focus on the next input field
    const nextInput = amountInput.nextElementSibling;
    if (nextInput && nextInput.tagName === 'INPUT') {
        nextInput.focus();
    }
}

function processDonation(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        amount: document.getElementById('donationAmount').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        message: document.getElementById('message').value
    };

    // Basic validation
    if (!formData.amount || formData.amount <= 0) {
        alert('Please enter a valid donation amount');
        return;
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
    }

    // Here you would typically:
    // 1. Send the data to your payment processor
    // 2. Handle the payment response
    // 3. Show success/error message

    // For now, we'll just show a success message
    alert('Thank you for your donation! We will process your payment shortly.');
    hideModal();
}

// Show/hide credit card fields based on payment method
document.getElementById('paymentMethod').addEventListener('change', function() {
    const creditCardFields = document.getElementById('creditCardFields');
    if (this.value === 'credit' || this.value === 'debit') {
        creditCardFields.style.display = 'block';
        // Focus on the first credit card field
        setTimeout(() => {
            const firstCardField = creditCardFields.querySelector('input');
            if (firstCardField) firstCardField.focus();
        }, 100);
    } else {
        creditCardFields.style.display = 'none';
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('donationModal');
    if (event.target === modal) {
        hideModal();
    }
});

// Handle keyboard events
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideModal();
    }
});

function showVolunteerForm() {
    document.getElementById('volunteerModal').style.display = 'block';
}

function hideVolunteerModal() {
    document.getElementById('volunteerModal').style.display = 'none';
}

function submitVolunteerForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        availability: document.getElementById('availability').value,
        interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value),
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to your server
    // For now, we'll just log it and show a success message
    console.log('Volunteer Form Data:', formData);
    
    // Show success message
    alert('Thank you for your interest in volunteering! We will contact you soon.');
    
    // Reset form and hide modal
    document.getElementById('volunteerForm').reset();
    hideVolunteerModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const volunteerModal = document.getElementById('volunteerModal');
    if (event.target === volunteerModal) {
        hideVolunteerModal();
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
}); 