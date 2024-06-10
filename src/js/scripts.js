document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const services = Array.from(form.querySelectorAll('input[name="service"]:checked')).map(input => input.value).join(', ');
    const serviceCosts = Array.from(form.querySelectorAll('input[name="service"]:checked')).reduce((total, input) => total + parseInt(input.getAttribute('data-cost')), 0);
    const stylist = form.querySelector('input[name="stylist"]:checked') ? form.querySelector('input[name="stylist"]:checked').value : '';
    const stylistCost = form.querySelector('input[name="stylist"]:checked') ? parseInt(form.querySelector('input[name="stylist"]:checked').getAttribute('data-cost')) : 0;
    const date = form.querySelector('input[name="date"]').value;
    const time = form.querySelector('input[name="time"]').value;
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;

    const totalCost = serviceCosts + stylistCost;

    const params = new URLSearchParams();
    params.append('services', services);
    params.append('stylist', stylist);
    params.append('date', date);
    params.append('time', time);
    params.append('name', name);
    params.append('email', email);
    params.append('cost', totalCost);

    window.open(`confirmation.html?${params.toString()}`, '_blank');
});

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    if (document.getElementById('name')) {
        document.getElementById('name').value = params.get('name');
        document.getElementById('email').value = params.get('email');
        document.getElementById('timeSlot').value = `${params.get('date')} ${params.get('time')}`;
        document.getElementById('service').value = params.get('services');
        document.getElementById('stylist').value = params.get('stylist');
        document.getElementById('cost').value = `$${params.get('cost')}`;
    }
});
