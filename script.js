// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});

// Search Functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    
    if (!query) {
        alert('Please enter a search query');
        return;
    }
    
    // Search terms mapping
    const searchTerms = {
        'temple': 'temples.html',
        'temples': 'temples.html',
        'hotel': 'hotels.html',
        'hotels': 'hotels.html',
        'place': 'places.html',
        'places': 'places.html',
        'tourist': 'places.html',
        'car': 'transport.html',
        'bike': 'transport.html',
        'transport': 'transport.html',
        'vehicle': 'transport.html',
        'rameswaram': 'index.html',
        'guide': 'index.html'
    };
    
    // Check if query matches any search term
    for (const [term, page] of Object.entries(searchTerms)) {
        if (query.includes(term)) {
            window.location.href = page;
            return;
        }
    }
    
    // If no match, show alert
    alert('Searching for: ' + query + '\nPlease navigate to the specific section or contact guide for assistance.');
}

// Filter Temples
function filterTemples() {
    const input = document.getElementById('templeSearch');
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.temple-card');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter Places
function filterPlaces() {
    const input = document.getElementById('placeSearch');
    const filter = input.value.toLowerCase();
    const cards = document.querySelectorAll('.place-card');
    
    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Contact Guide Function
function contactGuide(service) {
    const message = `Hi, I'm interested in booking: ${service}`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Hotel Booking Form Submission
function submitHotelBooking(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('hotelName').value,
        phone: document.getElementById('hotelPhone').value,
        email: document.getElementById('hotelEmail').value,
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        guests: document.getElementById('guests').value,
        roomType: document.getElementById('roomType').value,
        budget: document.getElementById('budget').value,
        requirements: document.getElementById('requirements').value
    };
    
    // Create WhatsApp message
    const message = `🏨 Hotel Booking Request\n\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Check-in: ${formData.checkIn}\n` +
        `Check-out: ${formData.checkOut}\n` +
        `Guests: ${formData.guests}\n` +
        `Room Type: ${formData.roomType}\n` +
        `Budget: ₹${formData.budget}\n` +
        `Requirements: ${formData.requirements || 'None'}`;
    
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    
    // Show success message
    showSuccessMessage('Booking request submitted! Redirecting to WhatsApp...');
    
    // Open WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        // Reset form
        document.getElementById('hotelBookingForm').reset();
    }, 1500);
}

// Transport Booking Form Submission
function submitTransportBooking(event) {
    event.preventDefault();
    
    const carType = document.getElementById('carType').value;
    
    const formData = {
        carType: carType,
        name: document.getElementById('transportName').value,
        phone: document.getElementById('transportPhone').value,
        email: document.getElementById('transportEmail').value,
        bookingDate: document.getElementById('bookingDate').value,
        duration: document.getElementById('duration').value,
        licenseNumber: document.getElementById('licenseNumber').value,
        pickupLocation: document.getElementById('pickupLocation').value,
        requirements: document.getElementById('transportRequirements').value
    };
    
    // Create WhatsApp message
    const message = `🚗 Car Booking Request\n\n` +
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email || 'Not provided'}\n` +
        `Car Type: ${formData.carType}\n` +
        `Booking Date: ${formData.bookingDate}\n` +
        `Duration: ${formData.duration}\n` +
        `License: ${formData.licenseNumber}\n` +
        `Pickup: ${formData.pickupLocation}\n` +
        `Requirements: ${formData.requirements || 'None'}`;
    
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    
    // Show success message
    showSuccessMessage('Booking request submitted! Redirecting to WhatsApp...');
    
    // Open WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        // Reset form
        document.getElementById('transportBookingForm').reset();
    }, 1500);
}

// Update Vehicle Options (deprecated - now using direct car selection)
function updateVehicleOptions() {
    // This function is no longer needed as we use direct car selection
}

// Show Success Message
function showSuccessMessage(message) {
    // Remove existing success messages
    const existing = document.querySelector('.success-message');
    if (existing) {
        existing.remove();
    }
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.textContent = message;
    
    // Insert at the beginning of the form container
    const form = document.querySelector('.booking-form') || document.querySelector('.content-section .container');
    if (form) {
        form.insertBefore(successDiv, form.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Set minimum dates for booking forms
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    
    // Set minimum date for hotel check-in
    const checkInInput = document.getElementById('checkIn');
    if (checkInInput) {
        checkInInput.setAttribute('min', today);
        checkInInput.addEventListener('change', function() {
            const checkOutInput = document.getElementById('checkOut');
            if (checkOutInput) {
                checkOutInput.setAttribute('min', this.value);
            }
        });
    }
    
    // Set minimum date for transport booking
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
        bookingDateInput.setAttribute('min', today);
    }
});

// Search on Enter key press
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    const templeSearch = document.getElementById('templeSearch');
    if (templeSearch) {
        templeSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterTemples();
            }
        });
    }
    
    const placeSearch = document.getElementById('placeSearch');
    if (placeSearch) {
        placeSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterPlaces();
            }
        });
    }
});

