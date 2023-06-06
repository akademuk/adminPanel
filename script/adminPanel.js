// Переключатель для ВКЛ и ВЫКЛ

$(document).ready(function () {
  $('.toggle').click(function () {
    var toggleContainer = $(this).closest('.adminPanelMainCard');

    var isFirstToggle = toggleContainer.data('isFirstToggle');
    if (typeof isFirstToggle === 'undefined' || isFirstToggle === true) {
      toggleContainer.find('.toggle-text1').removeClass('active');
      toggleContainer.find('.toggle-text2').addClass('active');
      toggleContainer.find('.toggle-switch').prop('checked', true);
      toggleContainer.data('isFirstToggle', false);
    } else {
      if (toggleContainer.find('.toggle-switch').is(':checked')) {
        toggleContainer.find('.toggle-switch').prop('checked', false);
        toggleContainer.find('.toggle-text1').addClass('active');
        toggleContainer.find('.toggle-text2').removeClass('active');
      } else {
        toggleContainer.find('.toggle-switch').prop('checked', true);
        toggleContainer.find('.toggle-text1').removeClass('active');
        toggleContainer.find('.toggle-text2').addClass('active');
      }
    }
  });

  $('.toggle-text1').addClass('active');
});





// Копировать рандомную ссылку

$(document).ready(function () {
  $('.copy-link').click(function () {
    var randomLink = generateRandomLink();
    copyToClipboard(randomLink);
  });
});

function generateRandomLink() {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomLink = '';
  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomLink += characters.charAt(randomIndex);
  }
  return 'https://example.com/' + randomLink;
}

function copyToClipboard(text) {
  var dummyElement = document.createElement('textarea');
  dummyElement.value = text;
  document.body.appendChild(dummyElement);
  dummyElement.select();
  document.execCommand('copy');
  document.body.removeChild(dummyElement);
  showCopyMessage();
}

function showCopyMessage() {
  var copyMessage = document.querySelector('.copy-message');
  copyMessage.textContent = 'Скопировано!';
  copyMessage.style.display = 'block';
  setTimeout(function () {
    copyMessage.style.display = 'none';
  }, 2000);
}



// Редактировать и сохранять input

function generateRandomNumber() {
  var randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
  return randomNumber;
}

document.querySelectorAll('.edit-icon').forEach(function (icon) {
  icon.addEventListener('click', function () {
    var input = icon.parentNode.querySelector('.text-input-1');
    input.removeAttribute('readonly');
    input.focus();
    var saveButton = icon.parentNode.querySelector('.edit-save');
    saveButton.classList.add('active');
    icon.classList.add('active');
  });
});

document.querySelectorAll('.edit-save').forEach(function (saveButton) {
  saveButton.addEventListener('click', function () {
    var input = saveButton.parentNode.querySelector('.text-input-1');
    input.setAttribute('readonly', 'readonly');
    saveButton.classList.remove('active');
    var icon = saveButton.parentNode.querySelector('.edit-icon');
    icon.classList.remove('active');
    var saveMessage = document.querySelector('.save-message');
    saveMessage.textContent = 'Изменения сохранены';

    saveMessage.style.display = 'block';
    setTimeout(function () {
      saveMessage.style.display = 'none';
    }, 2000);
  });
});


document.addEventListener('DOMContentLoaded', function () {
  var inputs = document.querySelectorAll('.text-input-1');
  inputs.forEach(function (input) {
    input.value = generateRandomNumber();

    input.addEventListener('.text-input-1', function () {
      var value = input.value;
      var newValue = value.replace(/[^A-Za-z0-9]/g, '').substring(0, 10);
      input.value = newValue;
    });
  });
});



// Ставить паузу и запуск

$(document).ready(function () {
  var pauseButtons = $('.adminPanelMainCardPause');
  var playButtons = $('.adminPanelMainCardPlay');
  var mainCards = $('.adminPanelMainCard');

  pauseButtons.on('click', function () {
    var mainCard = $(this).closest('.adminPanelMainCard');
    mainCard.addClass('darken');
    mainCard.find('.adminPanelMainCardPlay').addClass('active');
    $(this).hide();
    mainCard.find('.adminPanelMainCardPlay').show();
  });

  playButtons.on('click', function () {
    var mainCard = $(this).closest('.adminPanelMainCard');
    mainCard.removeClass('darken');
    mainCard.find('.adminPanelMainCardPlay').removeClass('active');
    $(this).hide();
    mainCard.find('.adminPanelMainCardPause').show();
  });
});



// Удалять карточку

$(document).ready(function () {
  var deleteButton = $('.delete');
  var modal = $('.modal');
  var modalConfirmButton = $('.modal-confirm');
  var modalCancelButton = $('.modal-cancel');

  deleteButton.on('click', function () {
    var mainCard = $(this).closest('.adminPanelMainCard');
    modal.show();

    modalConfirmButton.on('click', function () {
      mainCard.remove();
      modal.hide();
    });
  });

  modalCancelButton.on('click', function () {
    modal.hide();
  });
});



// Менять заголовок карточки

$(document).ready(function () {
  $('.editTittleBtn').click(function () {
    var editTittleText = $(this).parent().find('.editTittleText');
    editTittleText.empty().append($('<input type="text" class="titleInput" placeholder="Введите название">'));
    $('.titleInput').focus();
  });

  $(document).on('blur', '.titleInput', function () {
    var newTitle = $(this).val();
    var editTittleText = $(this).parent().find('.editTittleText');
    editTittleText.text(newTitle);
    showSavedMessage(editTittleText);
  });

  $(document).on('click', '.saveButton', function () {
    var editTittleText = $(this).parent().find('.editTittleText');
    var newTitle = editTittleText.text();
    saveTitle(newTitle);
    showSavedMessage(editTittleText);
  });
});

function showSavedMessage(element) {
  element.after($('<div class="savedMessage">Сохранено!</div>'));
  setTimeout(function () {
    element.next('.savedMessage').remove();
  }, 2000);
}

function saveTitle(newTitle) {
  // Здесь можно добавить логику сохранения текста
  console.log('Сохраненный текст:', newTitle);
}
