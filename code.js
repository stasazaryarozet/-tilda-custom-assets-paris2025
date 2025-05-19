// Обертка для всего кода, чтобы избежать конфликтов глобальных переменных
(function() {

    // --- НАЧАЛО БЛОКА CSS-СТИЛЕЙ ---
    // Все ваши CSS-правила помещаются сюда, внутри обратных кавычек (` `)
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
  top: 25%; /* Середина верхней половины экрана */
  right: 25px; /* Отступ от правого края */
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
     display: none !important; 
  }
}

/*
  ====================================================================
  Стили для полноэкранного фона красных блоков "Дни" и связанных
  ====================================================================
*/
#rec1036419766, /* ДЕНЬ I */
#rec1037930476, /* красный отступ после ДЕНЬ I */
#rec1036498676, /* ДЕНЬ III */
#rec1037931881, /* красный отступ после ДЕНЬ III */
#rec1036527986, /* ДЕНЬ V */
#rec1037934761, /* красный отступ после ДЕНЬ V */
#rec1036706306, /* красный отступ перед блоком "ВХОДЯТ" */
#rec1036700436, /* блок "ВХОДЯТ" */
#rec1036706841  /* красный отступ после блока "ВХОДЯТ" */
{
  width: 100vw !important; 
  max-width: 100vw !important; 
  padding-left: 0 !important;
  padding-right: 0 !important;
  position: relative !important; 
  left: 50% !important;
  transform: translateX(-50%) !important; 
  box-sizing: border-box !important;
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
      
      // Логика для скрытия у блоков авторов УДАЛЕНА
      // var authorBlockIDs = ['rec1036890941', '#rec1036956216']; 
      // var authorBlocks = authorBlockIDs.map(function(id) { return document.getElementById(id); }).filter(function(el) { return el !== null; });

      if (!stickyButton) { return; }

      var showButtonAfterScroll = 300; 
      var activeScreenWidth = 980; 
      var hideWhenBookBlockTopIsNear = window.innerHeight * 0.85; 

      function checkButtonVisibility() {
        if (window.innerWidth > activeScreenWidth) {
          stickyButton.classList.remove('sticky-button--visible');
          return;
        }

        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        
        var shouldShowBasedOnInitialScroll = scrollPosition > showButtonAfterScroll;
        var shouldHideDueToBookBlock = false;
        // var shouldHideDueToAuthorOverlap = false; // Эта переменная больше не нужна

        // Проверка на достижение блока #book (или конца страницы, если #book нет)
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

        // Итоговое решение о видимости (теперь без учета shouldHideDueToAuthorOverlap)
        if (shouldShowBasedOnInitialScroll && !shouldHideDueToBookBlock) {
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

**Ключевые изменения в JavaScript-части (`setupStickyButtonVisibility`):**

1.  **Удалены строки, связанные с `authorBlockSelectors` и `authorBlocks`:**
    ```javascript
    // var authorBlockIDs = ['rec1036890941', '#rec1036956216']; // Удалено или закомментировано
    // var authorBlocks = authorBlockIDs.map(function(id) { return document.getElementById(id); }).filter(function(el) { return el !== null; }); // Удалено или закомментировано
    ```
2.  **Удалена переменная `shouldHideDueToAuthorOverlap`** и вся логика проверки на пересечение с блоками авторов (цикл `for` и связанные с ним условия).
3.  **Условие для показа кнопки теперь проще:**
    ```javascript
    if (shouldShowBasedOnInitialScroll && !shouldHideDueToBookBlock) {
      stickyButton.classList.add('sticky-button--visible');
    } else {
      stickyButton.classList.remove('sticky-button--visible');
    }
    ```

Теперь плавающая кнопка будет появляться после прокрутки на 300px и исчезать только при приближении к блоку `#book` (или к концу страницы), без учета блоков с портретами авторов.

**Пожалуйста, обновите ваш файл `code.js` на GitHub этим кодом, переопубликуйте сайт Tilda и проверьте
