// Обертка для всего кода, чтобы избежать конфликтов глобальных переменных
(function() {

    // --- НАЧАЛО БЛОКА CSS-СТИЛЕЙ ---
    var cssStyles = `
/*
  ====================================================================
  ОБЩИЕ СТИЛИ И СТИЛИ ДЛЯ КНОПОК НА САЙТЕ TILDA
  (Версия для одного файла code.js)
  ====================================================================
*/

/* --- Скрытие стандартного Tilda "flash" эффекта (если он где-то включен в настройках блока) --- */
.t-btn[data-btneffects-first="btneffects-flash"] .t-btn_wrap-effects,
.t-submit[data-btneffects-first="btneffects-flash"] .t-btn_wrap-effects {
  display: none !important;
  animation: none !important;
}

/* --- Общая небольшая разрядка для некоторых текстовых элементов Tilda --- */
/* Примечание: для .t-btn и .t-submit будет свой letter-spacing ниже */
.t-title, .t-name, .t-heading, .t-uptitle, .t-descr, .t-text, 
.t-menu__link-item, .t-uptitle_xs, .t-uptitle_sm, 
.t-uptitle_md, .t-uptitle_lg, .t-uptitle_xl, [field="title"], 
[field="btitle"], [field="descr"], [field="bdescr"], 
[field="subtitle"], [field="text"] {
  letter-spacing: 0.02em;
}

/*
  ====================================================================
  ЕДИНЫЙ СТИЛЬ ДЛЯ ВСЕХ СТАНДАРТНЫХ КНОПОК TILDA (.t-btn, .t-submit)
  ====================================================================
*/
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

.t-btn > *,
.t-submit > *,
.t-btn span,
.t-submit span {
    position: relative;
    z-index: 2; 
}

/* "Размытый блик" для всех стандартных кнопок */
.t-btn::after,
.t-submit::after {
  content: '';
  position: absolute;
  top: 0; 
  left: -150%; 
  width: 75%;  
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 40%, 
    rgba(255, 255, 255, 0.25) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 1; 
  
  animation-name: blurredShineAcross;
  animation-duration: 20s !important; 
  animation-timing-function: ease-in-out; 
  animation-iteration-count: infinite; 
  animation-delay: 4s; 
}

@keyframes blurredShineAcross {
  0% {
    transform: translateX(0); 
  }
  25% { 
    transform: translateX(333%); 
  }
  100% { 
    transform: translateX(333%);
  }
}

/* Стиль ОБЩИХ КНОПОК при НАВЕДЕНИИ (:hover) - нежно-призывный респонс */
.t-btn:hover,
.t-submit:hover {
  transform: scale(1.03) !important; 
  filter: brightness(1.10) !important; 
  box-shadow: 0px 4px 8px rgba(0, 11, 48, 0.3) !important;
  animation-name: none !important; 
}

/* Стиль ОБЩИХ КНОПОК при НАЖАТИИ (:active) */
.t-btn:active,
.t-submit:active {
  transform: translateY(1px) scale(0.99) !important; 
  box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0,11,48,0.15) !important; 
  filter: brightness(0.92) !important;
  animation-name: none !important; 
}

/*
  ====================================================================
  Стили для ФИКСИРОВАННОЙ КРУГЛОЙ КНОПКИ-ИКОНКИ (#sticky-book-button)
  ====================================================================
*/
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
  /* display: none; /* Управляется JS через класс .sticky-button--visible, поэтому здесь flex не нужен по умолчанию */
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
  display: flex !important; /* Важно для центрирования SVG */
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
     display: none !important; /* Гарантированно скрываем на больших экранах */
  }
}
    `; // --- КОНЕЦ БЛОКА CSS-СТИЛЕЙ ---

    // Функция для внедрения CSS в <head>
    function addStylesToHead(css) {
        var head = document.head || document.getElementsByTagName('head')[0];
        if (!head) { return; }
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        if (styleElement.styleSheet) { // Для старых IE
            styleElement.styleSheet.cssText = css;
        } else {
            styleElement.appendChild(document.createTextNode(css));
        }
        head.appendChild(styleElement);
    }

    // --- НАЧАЛО БЛОКА JAVASCRIPT-ЛОГИКИ ---
    
    // Функция для попытки скрытия лейбла Tilda
    // ВНИМАНИЕ: Скрытие этого блока может нарушать условия использования Tilda!
    function attemptToHideTildaBadge() {
      var tildaBadge = document.getElementById('tildacopy'); // Убедитесь, что 'o' - латинская
      if (tildaBadge) {
        tildaBadge.setAttribute('style', 
          'display: none !important; visibility: hidden !important; opacity: 0 !important; ' +
          'width: 0px !important; height: 0px !important; margin: 0px !important; padding: 0px !important; ' +
          'border: none !important; position: absolute !important; left: -9999px !important; top: -9999px !important;'
        );
      }
    }

    // Функция для управления видимостью плавающей кнопки
    function setupStickyButtonVisibility() {
      var stickyButton = document.getElementById('sticky-book-button');
      var bookBlock = document.getElementById('book'); 
      
      // ===> ВАЖНО: Замените на актуальные ID ВАШИХ блоков с портретами авторов <===
      var authorBlockSelectors = ['#rec1036890941', '#rec1036956216']; // Это ПРИМЕРЫ ID, используйте свои!
      var authorBlocks = []; // Инициализируем пустым, чтобы избежать ошибок, если querySelectorAll не найдет ничего

      if (authorBlockSelectors.length > 0) {
          authorBlocks = Array.prototype.slice.call(document.querySelectorAll(authorBlockSelectors.join(',')));
      }
      
      if (!stickyButton) {
        return;
      }

      var showButtonAfterScroll = 300; 
      var activeScreenWidth = 980; 
      var hideBeforeBookBlockTopOffset = window.innerHeight * 0.3; 

      function checkButtonVisibility() {
        // Проверка ширины экрана должна быть первой
        if (window.innerWidth > activeScreenWidth) {
          if (stickyButton.classList.contains('sticky-button--visible')) {
            stickyButton.classList.remove('sticky-button--visible');
          }
          // Можно также принудительно установить display: none, если CSS @media не всегда срабатывает
          // stickyButton.style.display = 'none';
          return;
        }
        // Если CSS через @media уже скрыл кнопку, то JS не должен ее пытаться показать
        // Однако, если JS управляет классом, он должен иметь возможность ее показать, если display: flex.
        // Убедимся, что кнопка может быть показана, если она не скрыта медиа-запросом.
        // (Это сложно координировать, если CSS @media использует display:none !important)
        // Для простоты, будем полагаться на JS для управления видимостью на активных экранах.


        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        
        var shouldShowBasedOnInitialScroll = scrollPosition > showButtonAfterScroll;
        var shouldHideDueToBookBlock = false;
        var shouldHideDueToAuthorOverlap = false;

        // 1. Проверка на перекрытие с блоками авторов
        if (authorBlocks.length > 0) {
          var buttonRect = stickyButton.getBoundingClientRect();
          for (var i = 0; i < authorBlocks.length; i++) {
            if (!authorBlocks[i]) continue; // Пропускаем, если элемент не найден
            var authorRect = authorBlocks[i].getBoundingClientRect();
            // Проверка на пересечение прямоугольников
            var overlap = !(buttonRect.right < authorRect.left || 
                            buttonRect.left > authorRect.right || 
                            buttonRect.bottom < authorRect.top || 
                            buttonRect.top > authorRect.bottom);
            if (overlap) {
              shouldHideDueToAuthorOverlap = true;
              break; 
            }
          }
        }

        // 2. Проверка на достижение блока #book
        if (bookBlock) {
          var bookBlockRect = bookBlock.getBoundingClientRect();
          // Скрываем, если верх блока #book уже виден достаточно высоко (в пределах нижних 70% экрана)
          if (bookBlockRect.top < (windowHeight - hideBeforeBookBlockTopOffset)) {
            shouldHideDueToBookBlock = true;
          }
        } else {
          // Если блока #book нет, используем логику скрытия у самого низа страницы
          var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          var hideButtonBeforePageEnd = 250; 
          if ((scrollPosition + windowHeight) >= (documentHeight - hideButtonBeforePageEnd)) {
            shouldHideDueToBookBlock = true; 
          }
        }

        // Итоговое решение о видимости
        if (shouldShowBasedOnInitialScroll && !shouldHideDueToAuthorOverlap && !shouldHideDueToBookBlock) {
          stickyButton.classList.add('sticky-button--visible');
        } else {
          stickyButton.classList.remove('sticky-button--visible');
        }
      }

      window.addEventListener('scroll', checkButtonVisibility, { passive: true });
      window.addEventListener('resize', checkButtonVisibility);
      
      // Первоначальная проверка видимости с небольшой задержкой
      // чтобы Tilda успела построить все свои блоки, от которых могут зависеть offsetTop
      setTimeout(checkButtonVisibility, 300); 
    }

    // Выполнение функций после полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addStylesToHead(cssStyles); // Сначала добавляем стили
            attemptToHideTildaBadge();  // Затем пытаемся скрыть лейбл
            setupStickyButtonVisibility(); // Затем настраиваем кнопку

            // Дополнительные вызовы для скрытия лейбла Tilda
            setTimeout(attemptToHideTildaBadge, 1000);
            setTimeout(attemptToHideTildaBadge, 2500);
        });
    } else { // Если DOM уже загружен
        addStylesToHead(cssStyles);
        attemptToHideTildaBadge();
        setupStickyButtonVisibility();

        setTimeout(attemptToHideTildaBadge, 1000);
        setTimeout(attemptToHideTildaBadge, 2500);
    }
    
    // И еще одна попытка скрыть лейбл Tilda после полной загрузки всех ресурсов
    window.addEventListener('load', function() {
        setTimeout(attemptToHideTildaBadge, 500);
    });

})(); // --- КОНЕЦ ОБЕРТКИ И JAVASCRIPT-ЛОГИКИ ---
