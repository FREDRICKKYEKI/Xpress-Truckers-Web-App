window.onload = () => {
  $('ul.places-list').hide();
  const userRole = $('#user-role');
  const driverRole = $('#driver-role');
  const driverControls = $('.driver-controls');
  const locationInput = $('#location-input');

  locationInput.on('input', function () {
    let text = $(this).val();
    if (text.length < 3) return;
    $('ul.places-list').empty();
    $('ul.places-list').html(`<li>Loading...</li>`);
    fetch(`https://api.opencagedata.com/geosearch?q=${text}`, {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'opencage-geosearch-key': 'oc_gs_SJqvrAWtCs2mcAvMs5f9yPs6LI1QcD',
        'sec-ch-ua':
          '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        Referer: 'https://opencagedata.com/',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      },
      body: null,
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        $('ul.places-list').empty();

        let places = data.results;

        places.length > 0
          ? $('ul.places-list').append(
              `${places
                .map(
                  (place, index) =>
                    `<li class="location" id="place-${index}">${place.formatted}</li>`
                )
                .join('')}`
            )
          : $('ul.places-list').html(`<li><i>No results found</i></li>`);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  $("input:not([type='radio'], [type='checkbox'])").addClass('form-control');

  $(document).on('click', '.location', function (e) {
    e.preventDefault();
    locationInput.val($(this).text());
    validateInput(/.*/, locationInput);
  });

  locationInput.focus(function (e) {
    e.preventDefault();
    $('ul.places-list').show();
  });

  locationInput.blur(function (e) {
    e.preventDefault();
    setTimeout(() => {
      $('ul.places-list').hide();
    }, 300);
  });

  userRole.change(() => {
    driverControls.hide();
  });

  driverRole.change(() => {
    driverControls.show();
  });

  function validateInput(pattern, inputId) {
    let text = $(inputId).val();

    console.log(text, pattern.test(text));
    if (text.length < 1) {
      $(inputId).removeClass('is-valid');
      $(inputId).removeClass('is-invalid');
    } else if (text.length > 0 && !pattern.test(text)) {
      $(inputId).addClass('is-invalid');
      $(inputId).removeClass('is-valid');
    } else {
      $(inputId).removeClass('is-invalid');
      $(inputId).addClass('is-valid');
    }
  }

  $('#firstname, #lastname, #vehicle-make').on('input', function () {
    const pattern = /^[a-zA-Z]+$/;
    const id = $(this);
    validateInput(pattern, id);
  });

  $('#password').on('input', function () {
    ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const pattern = /\d|\w/;
    const id = $(this);
    validateInput(pattern, id);
  });
  $('#repeat-password').on('input', function () {
    let text = $(this).val();
    if (text.length < 1) {
      $(this).removeClass('is-valid');
      $(this).removeClass('is-invalid');
    } else if (text !== $('#password').val()) {
      $(this).addClass('is-invalid');
      $(this).removeClass('is-valid');
    } else {
      $(this).removeClass('is-invalid');
      $(this).addClass('is-valid');
    }
  });
  $('#phonenumber').on('input', function () {
    const pattern = /^0\d{9}$/;
    const id = $(this);
    validateInput(pattern, id);
  });

  $('#vehicle-registration').on('input', function () {
    const pattern = /^[a-zA-Z]{3} \d{3}[a-zA-Z]$/;
    const id = $(this);
    validateInput(pattern, id);
  });

  $('#email').on('input', function () {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const id = $(this);
    validateInput(pattern, id);
  });
};

//if no latitute and longitude is provided, use the default (for nairobi)
//add services
