
<!-- Script EmailJS -->

  // Initialisation
  (function() {
    emailjs.init("ntM7ihfexOQYpk0Gx"); // 🔹 remplace par ta clé publique EmailJS
  })();

  // Envoi du formulaire
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // empêche le rechargement de la page

    emailjs.sendForm('service_m2n8fvj', 'template_dyup6li', this)
      .then(function() {
        alert('Message envoyé avec succès ✅');
      }, function(error) {
        alert('Erreur lors de l’envoi ❌: ' + JSON.stringify(error));
      });
  });
