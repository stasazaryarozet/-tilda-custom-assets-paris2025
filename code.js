// Обертка для всего кода, чтобы избежать конфликтов глобальных переменных
(function() {

    // --- ВЕРСИЯ РЕДАКЦИИ СКРИПТА ---
    var SCRIPT_VERSION = "2.8";
    // --- ФЛАГ ДЛЯ ОТОБРАЖЕНИЯ ВЕРСИИ СКРИПТА НА СТРАНИЦЕ ---
    var DEBUG_SHOW_SCRIPT_VERSION = true;

    // --- НАЧАЛО БЛОКА CSS-СТИЛЕЙ ---
    var cssStyles = `
/*
 ====================================================================
 ОБЩИЕ СТИЛИ И СТИЛИ ДЛЯ КНОПОК НА САЙТЕ TILDA
 ====================================================================
*/

/* --- Стиль для отображения версии скрипта --- */
.script-version-display {
  position: fixed;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  font-family: Arial, sans-serif;
  z-index: 100000;
  border-radius: 3px;
}

/* --- Скрытие стандартного Tilda "flash" эффекта --- */
.t-btn[data-btneffects-first="btneffects-flash"] .t-btn_wrap-effects,
.t-submit[data-btneffects-first="btneffects-flash"] .t-btn_wrap-effects {
  display: none !important;
  animation: none !important;
}

/* --- Общая небольшая разрядка для некоторых текстовых элементов Tilda --- */
.t-title, .t-name, .t-heading, .t-uptitle, .t-descr, .t-text, 
.t-menu__link-item, .t-uptitle_xs, .t-uptitle_sm, 
.t-uptitle_md, .t-uptitle_lg, .t-uptitle_xl, [field="title"], 
[field="btitle"], [field="descr"], [field="bdescr"], 
[field="subtitle"], [field="text"] {
  letter-spacing: 0.02em;
}

/* --- ЕДИНЫЙ СТИЛЬ ДЛЯ ВСЕХ СТАНДАРТНЫХ КНОПОК TILDA (.t-btn, .t-submit) --- */
.t-btn,
.t-submit {
  position: relative !important; 
  overflow: hidden !important;   
  isolation: isolate !important; 
  border-radius: 7px !important;
  box-shadow: 0px 2px 3px rgba(0, 11, 48, 0.25) !important;
  letter-spacing: 0.02em !important; 
  font-weight: bold !important; 
  font-size: 18px !important;
  transition-duration: 0.6s !important; 
  transition-property: background-color, color, border-color, opacity, transform, box-shadow, filter !important;
  outline: none !important; 
  -webkit-tap-highlight-color: transparent !important; 
}
.t-btn > *, .t-submit > *, .t-btn span, .t-submit span {
    position: relative;
    z-index: 2; 
}

/* "Размытый блик" для всех стандартных кнопок */
.t-btn::after,
.t-submit::after {
  content: '';
  position: absolute;
  top: 0; left: -150%; 
  width: 75%; height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 40%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0) 100%);
  z-index: 1; 
  animation-name: blurredShineAcross;
  animation-duration: 20s !important; 
  animation-timing-function: ease-in-out; 
  animation-iteration-count: infinite; 
  animation-delay: 4s; 
}
@keyframes blurredShineAcross {
  0% { transform: translateX(0); }
  25% { transform: translateX(333%); }
  100% { transform: translateX(333%); }
}

/* Hover-эффект для .t-btn, .t-submit */
.t-btn:hover,
.t-submit:hover {
  transform: scale(1.03) !important; 
  filter: brightness(1.10) !important; 
  box-shadow: 0px 4px 8px rgba(0, 11, 48, 0.3) !important;
  animation-name: none !important; 
}

/* Active-эффект для .t-btn, .t-submit */
.t-btn:active,
.t-submit:active {
  transform: translateY(1px) scale(0.99) !important; 
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0,11,48,0.15) !important; 
  filter: brightness(0.92) !important;
  animation-name: none !important; 
}

/* --- СТИЛИ ДЛЯ ФИКСИРОВАННОЙ КРУГЛОЙ КНОПКИ-ИКОНКИ (#sticky-book-button) --- */
#sticky-book-button {
  position: fixed;
  top: 25%; 
  right: 25px; 
  transform: translateY(-50%) scale(0.8); 
  width: 60px; 
  height: 60px;
  background-color: #ffffff !important; 
  color: #333333 !important;          
  border-radius: 50% !important;
  display: none; 
  justify-content: center;
  align-items: center;
  text-decoration: none;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.18) !important; 
  z-index: 9990; 
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease, background-color 0.3s ease, box-shadow 0.3s ease !important;
  -webkit-tap-highlight-color: transparent;
}
#sticky-book-button.sticky-button--visible {
  display: flex !important; 
  opacity: 0.75; 
  visibility: visible;
  transform: translateY(-50%) scale(1); 
}
#sticky-book-button:hover {
  background-color: #f8f8f8 !important; 
  color: #000000 !important;
  transform: translateY(-50%) scale(1.08) !important; 
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25) !important; 
  opacity: 1 !important;
}
#sticky-book-button svg {
  width: 50%; 
  height: 50%;
  fill: currentColor; 
}

@media screen and (min-width: 981px) { 
  #sticky-book-button {
    width: 70px !important; 
    height: 70px !important;
    right: 40px !important; /* Увеличен отступ справа для широких экранов */
  }
   #sticky-book-button.sticky-button--visible {
     transform: translateY(-50%) scale(1.15) !important; 
   }
  #sticky-book-button:hover {
    transform: translateY(-50%) scale(1.25) !important; 
  }
}

/* --- Стили для полноэкранного фона красных блоков "Дни" и связанных --- */
#rec1036419766, #rec1037930476, #rec1036498676, #rec1037931881,
#rec1036527986, #rec1037934761, #rec1036706306, #rec1036700436, 
#rec1036706841 {
  width: 100vw !important; 
  max-width: 100vw !important; 
  padding-left: 0 !important;
  padding-right: 0 !important;
  position: relative !important; 
  left: 50% !important;
  transform: translateX(-50%) !important; 
  box-sizing: border-box !important;
}

/* --- ИСПРАВЛЕНИЕ ДЛЯ ОБРЕЗАННЫХ ПОРТРЕТОВ АВТОРОВ --- */
#rec1036890941 .t480__blockimg.t-bgimg,
#rec1036956216 .t480__blockimg.t-bgimg {
  background-size: contain !important; 
  background-repeat: no-repeat !important; 
  background-position: center center !important; 
}

/* --- Стили для изображения "кулис" (#rec1036627011) --- */
#rec1036627011 { 
  width: 100vw !important; 
  max-width: 100vw !important;
  position: relative !important;
  left: 50% !important;
  transform: translateX(-50%) !important; 
  overflow: hidden !important; 
  opacity: 0;
  transition: opacity 0.8s ease-out;
}
#rec1036627011.curtain-image-is-visible {
  opacity: 0.4 !important; 
}
#rec1036627011 .t107 { 
    padding-left: 0 !important;
    padding-right: 0 !important;
}
#rec1036627011 .t107 .t-img { 
  display: block !important;
  width: 200% !important; 
  max-width: 200% !important; 
  height: auto !important; 
  position: relative !important; 
  left: 50% !important;
  transform: translateX(-50%) !important; 
  border-radius: 0 !important; 
  border: none !important;
}

/* Стили для ссылки "подробности" в форме */
.form-details-link-wrapper {
  text-align: center; 
  margin-top: 8px; 
}
.form-details-link-wrapper a {
  font-size: 14px !important;
  font-weight: normal !important;
  text-decoration: underline !important;
  color: #ffffff !important; 
  text-transform: uppercase !important; 
  letter-spacing: 0.1em !important; 
  display: inline-block !important; 
}

/* Блок "Made on Tilda" БОЛЬШЕ НЕ СКРЫВАЕТСЯ этим скриптом */
/*
#tildacopy { 
  display: none !important;
}
*/
    `; // --- КОНЕЦ БЛОКА CSS-СТИЛЕЙ ---

    function addStylesToHead(css) {
        var head = document.head || document.getElementsByTagName('head')[0];
        if (!head) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css;
        } else {
            styleElement.appendChild(document.createTextNode(css));
        }
        head.appendChild(styleElement);
    }

    // --- НАЧАЛО БЛОКА JAVASCRIPT-ЛОГИКИ ---
   
    function displayScriptVersion() {
        if (!DEBUG_SHOW_SCRIPT_VERSION) {
            return;
        }
        var versionDisplay = document.createElement('div');
        versionDisplay.className = 'script-version-display';
        versionDisplay.textContent = 'Редакция скрипта: ' + SCRIPT_VERSION;
        document.body.appendChild(versionDisplay);
    }
   
    function setupStickyButtonVisibility() {
      var stickyButton = document.getElementById('sticky-book-button');
      var bookBlock = document.getElementById('book'); // Форма регистрации
      var contactsBlock = document.getElementById('rec1036743606'); // Блок с контактами (соцсети)
      
      if (!stickyButton) { return; }

      var showButtonAfterScroll = 300; 
      var hideBuffer = 20; // Буфер в пикселях, чтобы кнопка исчезала чуть раньше касания

      function checkButtonVisibility() {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        var shouldShowBasedOnInitialScroll = scrollPosition > showButtonAfterScroll;
        var shouldHideDueToBookBlock = false;
        var shouldHideDueToContactsBlock = false;

        // Получаем актуальные размеры и позицию кнопки только если она видима (или может стать видимой)
        // Это нужно, т.к. getBoundingClientRect() для display:none вернет все по нулям.
        // Но т.к. мы управляем видимостью через opacity и visibility, это должно быть ок.
        var buttonRect = stickyButton.getBoundingClientRect();
        var buttonBottomY = buttonRect.bottom;
        
        if (bookBlock) {
          var bookBlockRect = bookBlock.getBoundingClientRect();
          // Скрываем, если верхняя часть блока формы поднимается выше нижней границы кнопки (минус буфер)
          if (bookBlockRect.top < buttonBottomY + hideBuffer) { 
            shouldHideDueToBookBlock = true;
          }
        }
        
        if (contactsBlock) {
            var contactsBlockRect = contactsBlock.getBoundingClientRect();
            // Скрываем, если верхняя часть блока контактов поднимается выше нижней границы кнопки (минус буфер)
            if (contactsBlockRect.top < buttonBottomY + hideBuffer) {
                shouldHideDueToContactsBlock = true;
            }
        }

        // Дополнительное условие: если кнопка уже невидима (display:none), то buttonBottomY будет 0.
        // В этом случае, если другие условия для показа не выполняются, она останется скрытой.
        // Если же она должна появиться, но buttonBottomY = 0, это может вызвать проблему при первом показе.
        // Однако, мы сначала делаем display:flex, а потом уже opacity/visibility, так что размеры должны быть доступны.

        if (shouldShowBasedOnInitialScroll && !shouldHideDueToBookBlock && !shouldHideDueToContactsBlock) {
          if (stickyButton.style.display !== 'flex') { // Проверяем, чтобы не вызывать лишний раз, если уже flex
            stickyButton.style.display = 'flex'; // Убедимся, что display:flex перед анимацией opacity
          }
          stickyButton.classList.add('sticky-button--visible');
        } else {
          stickyButton.classList.remove('sticky-button--visible');
          // Можно добавить задержку перед установкой display:none, если это вызывает проблемы с transition
          // setTimeout(() => {
          //    if (!stickyButton.classList.contains('sticky-button--visible')) {
          //        stickyButton.style.display = 'none';
          //    }
          // }, 400); // 400ms - время transition
        }
      }

      window.addEventListener('scroll', checkButtonVisibility, { passive: true });
      window.addEventListener('resize', checkButtonVisibility);
      // Вызываем сразу, чтобы определить начальное состояние
      // и чтобы buttonRect был корректным при первой проверке
      if (stickyButton.style.display !== 'flex') {
          stickyButton.style.display = 'flex'; // Временно показать для получения размеров
          checkButtonVisibility(); // Проверить
          if (!stickyButton.classList.contains('sticky-button--visible')) { // Если по итогу проверки она не должна быть видима
             stickyButton.style.display = 'none'; // Скрыть обратно
          }
      } else {
          checkButtonVisibility();
      }
      // setTimeout(checkButtonVisibility, 100); // Небольшая задержка для инициализации
    }

    function setupCurtainImageAnimation() {
      var curtainImageBlock = document.getElementById('rec1036627011'); 
      if (!curtainImageBlock) {
        return;
      }
      var observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
      var observer = new IntersectionObserver(function(entries, observerInstance) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('curtain-image-is-visible');
          }
        });
      }, observerOptions);
      observer.observe(curtainImageBlock);
    }

    function addDetailsLinkToForm() {
        var descrElement = document.querySelector('#rec1037978986 .t696__descr');
        
        if (descrElement && !descrElement.parentNode.querySelector('.form-details-link-wrapper')) {
            var linkWrapper = document.createElement('div');
            linkWrapper.className = 'form-details-link-wrapper';

            var detailsLink = document.createElement('a');
            detailsLink.href = '#bottomline';
            detailsLink.textContent = 'подробности';
            
            linkWrapper.appendChild(detailsLink);
            
            descrElement.parentNode.insertBefore(linkWrapper, descrElement.nextSibling);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addStylesToHead(cssStyles);
            displayScriptVersion(); 
            setupStickyButtonVisibility();
            setupCurtainImageAnimation(); 
            addDetailsLinkToForm();
        });
    } else { 
        addStylesToHead(cssStyles);
        displayScriptVersion();
        setupStickyButtonVisibility();
        setupCurtainImageAnimation(); 
        addDetailsLinkToForm();
    }
   
    window.addEventListener('load', function() {
        if (DEBUG_SHOW_SCRIPT_VERSION && !document.querySelector('.script-version-display')) {
            displayScriptVersion();
        }
        // Повторный вызов setupStickyButtonVisibility и addDetailsLinkToForm на load для надежности,
        // если какие-то элементы Tilda или размеры были не до конца определены на DOMContentLoaded
        setupStickyButtonVisibility(); 
        addDetailsLinkToForm(); 
    });

})();
