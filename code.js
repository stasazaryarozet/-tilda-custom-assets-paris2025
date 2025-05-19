// Обертка для всего кода, чтобы избежать конфликтов глобальных переменных
(function() {

    // --- НАЧАЛО БЛОКА CSS-СТИЛЕЙ ---
    var cssStyles = `
/*
  ====================================================================
  ОБЩИЕ СТИЛИ И СТИЛИ ДЛЯ КНОПОК НА САЙТЕ TILDA
  ====================================================================
*/

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
     display: none !important; 
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

/* ====================================================================
  Стили для изображения "кулис" (#rec1036627011)
  - Шире экрана, полупрозрачное, плавное появление
  ====================================================================
*/
#rec1036627011 { /* Весь блок с изображением кулис */
  width: 200vw !important; /* Ширина в два раза больше экрана */
  max-width: 200vw !important;
  position: relative !important;
  left: 50% !important;
  transform: translateX(-50%) !important; /* Центрирование блока 200vw */
  overflow: hidden !important; /* Предотвращаем горизонтальный скролл */
  
  /* Начальное состояние для анимации появления */
  opacity: 0;
  /* transform: translateY(20px); /* Опционально: легкий сдвиг вверх при появлении */
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

#rec1036627011.curtain-image-is-visible {
  opacity: 0.4 !important; /* Полупрозрачность (40%). Настройте по вкусу (0.3 - 0.7) */
  /* transform: translateY(0) !important; */
}

#rec1036627011 .t107 .t-img { /* Само изображение внутри блока */
  border-radius: 0 !important; /* Убираем скругление, если было */
  border: none !important;
  padding: 0 !important;
  width: 100% !important; /* Изображение занимает всю ширину своего 200vw родителя */
  height: auto !important; /* Сохраняем пропорции */
  /* Прозрачность теперь управляется родительским блоком #rec1036627011 */
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

    // ===> НОВЫЙ JAVASCRIPT ДЛЯ АНИМАЦИИ ИЗОБРАЖЕНИЯ "КУЛИС" <===
    function setupCurtainImageAnimation() {
      var curtainImageBlock = document.getElementById('rec1036627011'); // ID вашего блока с изображением кулис
      if (!curtainImageBlock) {
        // console.log('Curtain image block #rec1036627011 not found.');
        return;
      }

      var observerOptions = {
        root: null, // Относительно окна просмотра
        rootMargin: '0px',
        threshold: 0.1 // Сработает, когда 10% элемента станет видимым
      };

      var observer = new IntersectionObserver(function(entries, observerInstance) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('curtain-image-is-visible');
            // Можно раскомментировать, если хотите, чтобы анимация сработала только один раз:
            // observerInstance.unobserve(entry.target); 
          } else {
            // Если хотите, чтобы изображение снова становилось прозрачным, когда уходит из вида:
            // entry.target.classList.remove('curtain-image-is-visible');
          }
        });
      }, observerOptions);

      observer.observe(curtainImageBlock);
    }


    // Выполнение функций после полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            addStylesToHead(cssStyles);
            attemptToHideTildaBadge(); 
            setupStickyButtonVisibility();
            setupCurtainImageAnimation(); // <=== ВЫЗОВ НОВОЙ ФУНКЦИИ
            setTimeout(attemptToHideTildaBadge, 1000);
            setTimeout(attemptToHideTildaBadge, 2500);
        });
    } else { 
        addStylesToHead(cssStyles);
        attemptToHideTildaBadge();
        setupStickyButtonVisibility();
        setupCurtainImageAnimation(); // <=== ВЫЗОВ НОВОЙ ФУНКЦИИ
        setTimeout(attemptToHideTildaBadge, 1000);
        setTimeout(attemptToHideTildaBadge, 2500);
    }
    
    window.addEventListener('load', function() {
        setTimeout(attemptToHideTildaBadge, 500);
        // Можно и здесь вызвать setupCurtainImageAnimation, если есть проблемы с определением размеров элементов раньше
        // setTimeout(setupCurtainImageAnimation, 100); 
    });

})();
```

**Ключевые изменения в этом файле:**

* **В CSS-части добавлен новый блок:**
    ```css
    /* ====================================================================
      Стили для изображения "кулис" (#rec1036627011)
      - Шире экрана, полупрозрачное, плавное появление
      ====================================================================
    */
    #rec1036627011 { /* Весь блок с изображением кулис */
      width: 200vw !important; /* Ширина в два раза больше экрана */
      max-width: 200vw !important;
      position: relative !important;
      left: 50% !important;
      transform: translateX(-50%) !important; /* Центрирование блока 200vw */
      overflow: hidden !important; /* Предотвращаем горизонтальный скролл */
      
      /* Начальное состояние для анимации появления */
      opacity: 0;
      /* transform: translateY(20px); /* Опционально: легкий сдвиг вверх при появлении */
      transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    #rec1036627011.curtain-image-is-visible {
      opacity: 0.4 !important; /* Полупрозрачность (40%). Настройте по вкусу (0.3 - 0.7) */
      /* transform: translateY(0) !important; */
    }

    #rec1036627011 .t107 .t-img { /* Само изображение внутри блока */
      border-radius: 0 !important; /* Убираем скругление, если было */
      border: none !important;
      padding: 0 !important;
      width: 100% !important; /* Изображение занимает всю ширину своего 200vw родителя */
      height: auto !important; /* Сохраняем пропорции */
    }
