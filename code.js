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
  0% { transform: translateX(0); }
  25% { transform: translateX(333%); }
  100% { transform: translateX(333%); }
}

/* Стиль ОБЩИХ КНОПОК при НАВЕДЕНИИ (:hover) */
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
  /* === ИЗМЕНЕНО: Позиция - середина верхней половины правого края === */
  top: 25%; 
  right: 25px; /* Возвращаем ваш предпочтительный отступ */
  transform: translateY(-50%) scale(0.8); /* translateY(-50%) для точного вертикального центрирования */
  
  width: 60px; 
  height: 60px;
  background-color: #ffffff !important; 
  color: #333333 !important;           
  border-radius: 50% !important;
  
  display: none; /* Изначально скрыта, управляется JS через класс .sticky-button--visible */
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
  transform: translateY(-50%) scale(1); /* Сохраняем translateY(-50%) для центрирования */
}

#sticky-book-button:hover {
  background-color: #f8f8f8 !important; 
  color: #000000 !important;
  transform: translateY(-50%) scale(1.08) !important; /* Сохраняем translateY(-50%) */
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25) !important; 
  opacity: 1 !important;
}

#sticky-book-button svg {
  width: 50%; 
  height: 50%;
  fill: currentColor; 
}

/* Медиа-запрос для скрытия плавающей кнопки на больших экранах (дополнительно к JS) */
@media screen and (min-width: 981px) { 
  #sticky-book-button {
     display: none !important; 
  }
}

/* Скрытие блока "Made on Tilda" */
#tildacopy { 
  display: none !important;
}
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
    
    function attemptToHideTildaBadge() {
      var tildaBadge = document.getElementById('tildacopy'); 
      if (tildaBadge) {
        tildaBadge.setAttribute('style', 
          'display: none !important; visibility: hidden !important; opacity: 0 !important; ' +
          'width: 0px !important; height: 0px !important; margin: 0px !important; padding: 0px !important; ' +
          'border: none !important; position: absolute !important; left: -9999px !important; top: -9999px !important;'
        );
      }
    }

    function setupStickyButtonVisibility() {
      var stickyButton = document.getElementById('sticky-book-button');
      var bookBlock = document.getElementById('book'); 
      
      // ===> ВАЖНО: Укажите ID ВАШИХ блоков с портретами авторов! <===
      var authorBlockIDs = ['rec1036890941', 'rec1036956216']; // Пример ID из вашего предыдущего HTML
      var authorBlocks = authorBlockIDs.map(function(id) { return document.getElementById(id); }).filter(function(el) { return el !== null; });

      if (!stickyButton) { return; }

      var showButtonAfterScroll = 300; 
      var activeScreenWidth = 980; 
      var hideWhenBookBlockTopIsNear = window.innerHeight * 0.85; // Скрывать, когда до верха блока #book остается ~15% высоты окна снизу

      function checkButtonVisibility() {
        if (window.innerWidth > activeScreenWidth) {
          stickyButton.classList.remove('sticky-button--visible');
          return;
        }

        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        
        var shouldShowBasedOnInitialScroll = scrollPosition > showButtonAfterScroll;
        var shouldHideDueToBookBlock = false;
        var shouldHideDueToAuthorOverlap = false;

        // 1. Проверка на перекрытие с блоками авторов
        // === ИЗМЕНЕННАЯ ЛОГИКА ===
        if (authorBlocks.length > 0) {
          var buttonRect = stickyButton.getBoundingClientRect(); // Координаты кнопки относительно вьюпорта
          for (var i = 0; i < authorBlocks.length; i++) {
            var authorRect = authorBlocks[i].getBoundingClientRect(); // Координаты блока автора относительно вьюпорта

            // Проверяем, виден ли блок автора хотя бы частично
            var authorIsVisible = authorRect.top < windowHeight && authorRect.bottom > 0;

            if (authorIsVisible) {
              // Проверяем вертикальное пересечение кнопки и блока автора
              var verticalOverlap = buttonRect.top < authorRect.bottom && buttonRect.bottom > authorRect.top;
              if (verticalOverlap) {
                shouldHideDueToAuthorOverlap = true;
                break; 
              }
            }
          }
        }

        // 2. Проверка на достижение блока #book
        if (bookBlock) {
          var bookBlockRect = bookBlock.getBoundingClientRect();
          if (bookBlockRect.top < hideWhenBookBlockTopIsNear) {
            shouldHideDueToBookBlock = true;
          }
        } else {
          var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          var hideButtonBeforePageEnd = 250; 
          if ((scrollPosition + windowHeight) >= (documentHeight - hideButtonBeforePageEnd)) {
            shouldHideDueToBookBlock = true; 
          }
        }

        if (shouldShowBasedOnInitialScroll && !shouldHideDueToAuthorOverlap && !shouldHideDueToBookBlock) {
          stickyButton.classList.add('sticky-button--visible');
        } else {
          stickyButton.classList.remove('sticky-button--visible');
        }
      }

      window.addEventListener('scroll', checkButtonVisibility, { passive: true });
      window.addEventListener('resize', checkButtonVisibility);
      setTimeout(checkButtonVisibility, 300); 
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addStylesToHead(cssStyles);
            attemptToHideTildaBadge(); 
            setupStickyButtonVisibility();
            setTimeout(attemptToHideTildaBadge, 1000);
            setTimeout(attemptToHideTildaBadge, 2500);
        });
    } else { 
        addStylesToHead(cssStyles);
        attemptToHideTildaBadge();
        setupStickyButtonVisibility();
        setTimeout(attemptToHideTildaBadge, 1000);
        setTimeout(attemptToHideTildaBadge, 2500);
    }
    
    window.addEventListener('load', function() {
        setTimeout(attemptToHideTildaBadge, 500);
    });

})();
```

**Ключевые изменения в этом файле:**

* **CSS для `#sticky-book-button`:**
    * `top: 25%;` (для размещения в середине верхней половины правого края).
    * `right: 25px;` (возвращен ваш предпочтительный отступ).
    * `transform: translateY(-50%) scale(0.8);` (и аналогично для `:hover` и `.sticky-button--visible` состояний) для корректного вертикального центрирования.
* **JavaScript для `setupStickyButtonVisibility()`:**
    * **`authorBlockSelectors`**: **Обязательно замените** `['#rec1036890941', '#rec1036956216']` на актуальные ID ваших блоков с портретами авторов.
    * **Логика `shouldHideDueToAuthorOverlap`:** Теперь она проверяет, виден ли блок автора на экране, и если да, то есть ли вертикальное пересечение между плавающей кнопкой и этим блоком автора. Если пересечение есть, кнопка будет скрыта. Это более прямой способ предотвратить наложение на видимые портреты.
    * **`hideWhenBookBlockTopIsNear`**: Немного изменил комментарий для ясности. Это расстояние от верха окна, при котором, если верх блока `#book` поднимется выше этой точки, кнопка скроется.

**После того как вы обновите файл `code.js` на GitHub этим содержимым:**

1.  Подождите несколько минут, пока GitHub Pages обновит кэш.
2.  **Переопубликуйте все страницы вашего сайта Tilda.**
3.  Проверьте результат в режиме инкогнито или после жесткой перезагрузки (Ctrl+Shift+R или Cmd+Shift+R).

Надеюсь, эти изменения помогут достичь желаемого поведения кноп
