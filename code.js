// Обертка для всего кода, чтобы избежать конфликтов глобальных переменных
(function() {

    // --- НАЧАЛО БЛОКА CSS-СТИЛЕЙ ---
    // Все ваши CSS-правила помещаются сюда, внутри обратных кавычек (` `)
    // Обратите внимание на использование `!important` там, где это необходимо для переопределения стилей Tilda.
    var cssStyles = `
/*
  ====================================================================
  ОБЩИЕ СТИЛИ И СТИЛИ ДЛЯ КНОПОК НА САЙТЕ TILDA
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
/* Не применяем к .t-btn и .t-submit здесь, так как у них будет свой letter-spacing */
.t-menu__link-item, .t-uptitle_xs, .t-uptitle_sm, 
.t-uptitle_md, .t-uptitle_lg, .t-uptitle_xl, [field="title"], 
[field="btitle"], [field="descr"], [field="bdescr"], 
[field="subtitle"], [field="text"] {
  letter-spacing: 0.02em; /* Очень легкая разрядка */
}

/*
  ====================================================================
  ЕДИНЫЙ СТИЛЬ ДЛЯ ВСЕХ СТАНДАРТНЫХ КНОПОК TILDA (.t-btn, .t-submit)
  ====================================================================
*/
.t-btn,
.t-submit {
  position: relative !important; /* Важно для ::after и корректного overflow */
  overflow: hidden !important;   
  isolation: isolate !important; /* Для корректной работы z-index псевдоэлементов */

  border-radius: 7px !important;
  box-shadow: 0px 2px 3px rgba(0, 11, 48, 0.25) !important;
  letter-spacing: 0.03em !important; /* Разрядка для текста кнопок */
  font-weight: bold !important; 
  font-size: 18px !important; /* Размер текста кнопок (настройте при необходимости) */
  
  transition-duration: 0.6s !important; 
  transition-property: background-color, color, border-color, opacity, transform, box-shadow, filter !important;
  
  outline: none !important; 
  -webkit-tap-highlight-color: transparent !important; 
}

/* Текст и иконки внутри стандартных кнопок должны быть поверх блика */
.t-btn > *,
.t-submit > *, /* Для <button> текст является прямым потомком */
.t-btn span, /* Для кнопок Tilda, где текст в span */
.t-submit span {
    position: relative; /* Чтобы z-index сработал */
    z-index: 2; 
}

/* "Размытый блик" для всех стандартных кнопок */
.t-btn::after,
.t-submit::after {
  content: '';
  position: absolute;
  top: 0; 
  left: -150%; /* Начальное положение за пределами кнопки слева */
  width: 75%;  /* Ширина блика */
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 40%, /* Яркость блика */
    rgba(255, 255, 255, 0.25) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 1; /* Блик под текстом, но над фоном кнопки */
  
  animation-name: blurredShineAcross;
  animation-duration: 20s !important; /* Длительность цикла блика (очень редко) */
  animation-timing-function: ease-in-out; 
  animation-iteration-count: infinite; 
  animation-delay: 4s; /* Задержка перед первым появлением */
}

@keyframes blurredShineAcross {
  0% {
    transform: translateX(0); 
  }
  25% { /* Движение блика занимает 25% от общего цикла (5 сек из 20с) */
    transform: translateX(333%); /* Перемещаем далеко вправо */
  }
  100% { 
    transform: translateX(333%); /* Остается за пределами */
  }
}

/* Стиль ОБЩИХ КНОПОК при НАВЕДЕНИИ (:hover) - нежно-призывный респонс */
.t-btn:hover,
.t-submit:hover {
  transform: scale(1.03) !important; 
  filter: brightness(1.10) !important; 
  box-shadow: 0px 4px 8px rgba(0, 11, 48, 0.3) !important;
  animation-name: none !important; /* Убираем любые другие @keyframes анимации на hover */
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
  transform: translateY(-50%) scale(0.8); /* Вертикальное центрирование + начальное уменьшение */
  width: 60px; 
  height: 60px;
  background-color: #ffffff !important; 
  color: #333333 !important; /* Цвет иконки */
  border-radius: 50% !important;
  display: none; /* Изначально скрыта, управляется JS */
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
  opacity: 0.75; /* Едва видимая */
  visibility: visible;
  transform: translateY(-50%) scale(1); /* Нормальный размер и позиция */
}

#sticky-book-button:hover {
  background-color: #f8f8f8 !important; 
  color: #000000 !important; /* Иконка становится черной */
  transform: translateY(-50%) scale(1.08) !important; 
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25) !important; 
  opacity: 1 !important; /* Полностью непрозрачна при наведении */
}

#sticky-book-button svg {
  width: 50%; 
  height: 50%;
  fill: currentColor; 
}

/* Медиа-запрос для скрытия плавающей кнопки на больших экранах */
@media screen and (min-width: 981px) { 
  #sticky-book-button {
     display: none !important; 
  }
}

/*
  ====================================================================
  Скрытие блока "Made on Tilda" (с высоким риском нарушения условий Tilda)
  ====================================================================
*/
#tildacopy { /* Убедитесь, что здесь все буквы латинские: t-i-l-d-a-c-o-p-y */
  display: none !important;
  /* Если display:none все еще перебивается JS Tilda, можно попробовать более агрессивные методы,
     но они также могут быть обнаружены и заблокированы:
  position: fixed !important; 
  left: -99999px !important; 
  top: -99999px !important;
  width: 0px !important;
  height: 0px !important;
  overflow: hidden !important;
  visibility: hidden !important;
  opacity: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  z-index: -1000 !important;
  */
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

    // Внедряем стили, как только DOM готов (или сразу, если уже готов)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { addStylesToHead(cssStyles); });
    } else {
        addStylesToHead(cssStyles);
    }

    // --- НАЧАЛО БЛОКА JAVASCRIPT-ЛОГИКИ ---
    
    // Функция для скрытия лейбла Tilda (с попытками и задержками)
    function attemptToHideTildaBadge() {
      var tildaBadge = document.getElementById('tildacopy'); // Латинская 'o'
      if (tildaBadge) {
        // Этот метод с setAttribute('style', ...) более агрессивный
        tildaBadge.setAttribute('style', 
          'display: none !important; visibility: hidden !important; opacity: 0 !important; ' +
          'width: 0px !important; height: 0px !important; margin: 0px !important; padding: 0px !important; ' +
          'border: none !important; position: absolute !important; left: -9999px !important; top: -9999px !important;'
        );
        // console.log('Tilda badge hiding attempted via setAttribute.');
      } else {
        // console.log('Tilda badge not found for hiding.');
      }
    }

    // Функция для управления видимостью плавающей кнопки
    function setupStickyButtonVisibility() {
      var stickyButton = document.getElementById('sticky-book-button');
      var bookBlock = document.getElementById('book'); 
      
      // ===> ВАЖНО: Замените на актуальные ID ваших блоков с портретами авторов <===
      var authorBlockSelectors = ['#rec1036890941', '#rec1036956216']; 
      var authorBlocks = authorBlockSelectors.map(function(selector) { return document.querySelector(selector); }).filter(function(el) { return el !== null; });

      if (!stickyButton) {
        return;
      }

      var showButtonAfterScroll = 300; 
      var activeScreenWidth = 980; 
      var hideBeforeBookBlockTopOffset = window.innerHeight * 0.3; // Скрывать, когда до верха #book остается 30% высоты экрана снизу

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
        if (authorBlocks.length > 0) {
          var buttonRect = stickyButton.getBoundingClientRect();
          for (var i = 0; i < authorBlocks.length; i++) {
            var authorRect = authorBlocks[i].getBoundingClientRect();
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

        // 2. Проверка на достижение блока #book (или конца страницы, если #book нет)
        if (bookBlock) {
          var bookBlockRect = bookBlock.getBoundingClientRect();
          if (bookBlockRect.top < (windowHeight - hideBeforeBookBlockTopOffset)) {
            shouldHideDueToBookBlock = true;
          }
        } else {
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
      setTimeout(checkButtonVisibility, 250); // Немного увеличена задержка для надежности
    }

    // Запускаем основные функции после загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
      attemptToHideTildaBadge(); // Первая попытка скрыть лейбл
      setupStickyButtonVisibility(); // Настройка плавающей кнопки

      // Дополнительные попытки скрыть лейбл Tilda с бОльшими задержками
      setTimeout(attemptToHideTildaBadge, 1000);
      setTimeout(attemptToHideTildaBadge, 3000);
    });

    // И еще одна попытка после полной загрузки всех ресурсов страницы
    window.addEventListener('load', function() {
        setTimeout(attemptToHideTildaBadge, 500);
    });

})(); // --- КОНЕЦ ОБЕРТКИ И JAVASCRIPT-ЛОГИКИ ---
